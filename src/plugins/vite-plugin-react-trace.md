# vite-plugin-react-trace

## Short description

This Vite plugin instruments React TSX files adding a `data-path` attribute to JSX elements. The attribute is computed from the path relative to the configured `root` (default `src`) and the component/tag name.

## Install

Run:

```bash
npm install -D @babel/parser @babel/traverse @babel/generator @babel/types
```

## Usage (example)

In `vite.config.ts` (example already added to the repo):

```ts
import reactTrace from "./src/plugins/vite-plugin-react-trace";

export default defineConfig({
  vite: {
    plugins: [reactTrace({ enabled: true, root: "src", strategy: "file-path" })],
  },
});
```

## How it works (short)

- Parses `.tsx` files with `@babel/parser` to an AST.
- Detects component declarations (function, arrow, class) to know component names.
- Traverses the AST and injects `data-path` on JSX elements that don't already have it.
- `data-path` values are built from the file path relative to `root` plus the component or tag name. Root-level returned JSX in a component uses the component's name.

## Options

- `enabled` (boolean): toggle plugin.
- `root` (string): folder to compute relative paths from (default `src`).
- `strategy` (`file-path` | `component-name`): currently implemented as described; the plugin computes component paths and tag-based paths accordingly.

## Notes

- Keep the plugin `enforce: 'pre'` so HMR still works; heavy parsing is limited to `.tsx` files only.
- If you need a different path schema, adjust the name-building logic in the plugin file.
