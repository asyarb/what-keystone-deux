import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["./src/**/*.ts"],
  outDir: "./dist",
  target: "node16",
  format: ["esm"],

  skipNodeModulesBundle: true,
  clean: true,

  bundle: false,
  dts: false,
  minify: false,
})
