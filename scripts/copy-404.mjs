import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist");
const indexFile = resolve(distDir, "index.html");
const notFoundFile = resolve(distDir, "404.html");

try {
  await copyFile(indexFile, notFoundFile);
  console.log("Copied dist/index.html to dist/404.html");
} catch (error) {
  console.error("Failed to create dist/404.html", error);
  process.exitCode = 1;
}
