import { defineConfig } from "tsup"
import * as dotenv from "dotenv"

const env = dotenv.config().parsed

export default defineConfig({
  entry: ["./src/**/*.ts"],
  outDir: "./dist",
  target: "node16",
  format: ["esm"],

  env,

  skipNodeModulesBundle: true,
  clean: true,

  bundle: false,
  dts: false,
  minify: false,
})
