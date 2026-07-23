/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plugin } from "vite";
import path from "path";
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";

export type Strategy = "file-path" | "component-name";

export interface ReactTraceOptions {
  enabled: boolean;
  root: string; // directory relative to project root to compute paths from, e.g. 'src'
  strategy: Strategy;
}

const defaultOptions: ReactTraceOptions = {
  enabled: true,
  root: "src",
  strategy: "file-path",
};

// `@babel/traverse` sometimes ships as a CJS module where the actual
// function is on the `.default` property when imported under ESM.
const babelTraverse: typeof traverse = (traverse as any)?.default || (traverse as any);
// similar interop handling for generator
const babelGenerate: typeof generate = (generate as any)?.default || (generate as any);

function isJSXReturningFunction(node: any) {
  if (!node) return false;
  // Arrow concise body returning JSX
  if (t.isJSXElement(node) || t.isJSXFragment(node)) return true;
  if (t.isBlockStatement(node)) {
    let found = false;
    for (const stmt of node.body) {
      if (
        t.isReturnStatement(stmt) &&
        (t.isJSXElement(stmt.argument) || t.isJSXFragment(stmt.argument))
      ) {
        found = true;
        break;
      }
    }
    return found;
  }
  return false;
}

function getIdentifierFromParent(p: any): string | null {
  if (!p) return null;
  if (p.isFunctionDeclaration() && p.node.id && p.node.id.name) return p.node.id.name;
  if (p.isVariableDeclarator() && t.isIdentifier(p.node.id)) return p.node.id.name;
  if (p.isClassDeclaration() && p.node.id && p.node.id.name) return p.node.id.name;
  if (
    p.isFunctionExpression() &&
    p.parentPath &&
    p.parentPath.isVariableDeclarator() &&
    t.isIdentifier(p.parentPath.node.id)
  )
    return p.parentPath.node.id.name;
  return null;
}

export default function reactTracePlugin(opts?: Partial<ReactTraceOptions>): Plugin {
  const options: ReactTraceOptions = { ...defaultOptions, ...(opts || {}) };

  return {
    name: "vite-plugin-react-trace",
    enforce: "pre",
    async transform(code, id) {
      if (!options.enabled) return null;
      if (!id.endsWith(".tsx")) return null;
      if (id.includes("node_modules")) return null;

      const rel = path.relative(process.cwd(), id).split(path.sep).join("/");
      const rootPrefix = options.root.replace(/^\/+|\/+$/g, "") + "/"; // src/
      const rootIndex = rel.indexOf(rootPrefix);
      if (rootIndex === -1) return null; // not inside configured root

      const relFromRoot = rel.substring(rootIndex + rootPrefix.length);
      const fileDir =
        path.posix.dirname(relFromRoot) === "." ? "" : path.posix.dirname(relFromRoot);
      const fileBase = path.posix.basename(relFromRoot).replace(/\.[^.]+$/, "");

      let ast: any;
      try {
        ast = parser.parse(code, {
          sourceType: "module",
          plugins: ["typescript", "jsx", "classProperties", "decorators-legacy"],
        });
      } catch (e) {
        // fail safe: don't transform on parse errors
        return null;
      }

      const components = new Set<string>();

      babelTraverse(ast, {
        FunctionDeclaration(path) {
          if (path.node.id && path.node.id.name && isJSXReturningFunction(path.node.body)) {
            components.add(path.node.id.name);
          }
        },
        VariableDeclarator(path) {
          if (
            t.isIdentifier(path.node.id) &&
            (t.isArrowFunctionExpression(path.node.init) || t.isFunctionExpression(path.node.init))
          ) {
            const init = path.node.init;
            if (isJSXReturningFunction(init.body)) {
              components.add(path.node.id.name);
            }
          }
        },
        ClassDeclaration(path) {
          if (path.node.id && path.node.id.name) {
            // Heuristic: consider any class in file a component (conservative)
            components.add(path.node.id.name);
          }
        },
      });

      babelTraverse(ast, {
        JSXOpeningElement(path) {
          const attrs = path.node.attributes || [];
          const has = attrs.some(
            (a: any) =>
              t.isJSXAttribute(a) && t.isJSXIdentifier(a.name) && a.name.name === "data-path",
          );
          if (has) return;

          // get tag name
          let tagName = "";
          if (t.isJSXIdentifier(path.node.name)) tagName = path.node.name.name;
          else if (t.isJSXMemberExpression(path.node.name)) {
            // flatten A.B -> A.B
            const parts: string[] = [];
            let cur: any = path.node.name;
            while (t.isJSXMemberExpression(cur)) {
              if (t.isJSXIdentifier(cur.property)) parts.unshift(cur.property.name);
              cur = cur.object;
            }
            if (t.isJSXIdentifier(cur)) parts.unshift(cur.name);
            tagName = parts.join(".");
          }

          const isComponent = /^[A-Z]/.test(tagName);

          // find enclosing component name (if any)
          const compParent = path.findParent((p: any) => {
            return (
              p.isFunctionDeclaration() ||
              p.isFunctionExpression() ||
              p.isArrowFunctionExpression() ||
              p.isVariableDeclarator() ||
              p.isClassDeclaration()
            );
          });
          let enclosingName: string | null = null;
          if (compParent) {
            enclosingName = getIdentifierFromParent(compParent) || null;
            if (enclosingName && !components.has(enclosingName)) {
              // only consider as component if we detected it earlier
              enclosingName = null;
            }
          }

          // is this JSX the root return of the enclosing component?
          let isRoot = false;
          const returnParent = path.findParent((p: any) => p.isReturnStatement());
          if (returnParent && enclosingName) {
            // check that the return belongs to the same component
            const funcOfReturn = returnParent.findParent(
              (p: any) =>
                p.isFunctionDeclaration() ||
                p.isFunctionExpression() ||
                p.isArrowFunctionExpression() ||
                p.isClassMethod(),
            );
            const nameOfFunc = getIdentifierFromParent(funcOfReturn);
            if (nameOfFunc === enclosingName) {
              isRoot = true;
            }
          }

          // compute data-path value
          const prefix = fileDir ? `${fileDir}/` : "";
          let value = "";

          if (isRoot && enclosingName) {
            // root element of component -> use component name
            value = `${prefix}${enclosingName}`;
          } else if (isComponent) {
            // component tag -> directory + tag name
            value = `${prefix}${tagName}`;
          } else if (enclosingName) {
            // nested native element -> componentName/tag
            value = `${prefix}${enclosingName}/${tagName}`;
          } else {
            value = `${prefix}${tagName}`;
          }

          const attr = t.jsxAttribute(t.jsxIdentifier("data-path"), t.stringLiteral(value));
          path.node.attributes.push(attr);
        },
      });

      const output = babelGenerate(ast, { compact: false, jsescOption: { minimal: true } }, code);
      return { code: output.code, map: null };
    },
  };
}
