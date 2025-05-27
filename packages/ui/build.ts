import { build } from "bun";

await build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "browser",
  format: "esm",
  splitting: true,
  sourcemap: "external",
  minify: process.env.NODE_ENV === "production",
  external: ["react", "react-dom", "react-native"]
});

// 生成 CJS 版本
await build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "browser",
  format: "cjs",
  sourcemap: "external",
  minify: process.env.NODE_ENV === "production",
  external: ["react", "react-dom", "react-native"]
});

console.log("✅ UI 库构建完成");