import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

/** @type {import('rollup').RollupOptions} */
export default {
   input: {
      index: "src/index.ts",
      internals: "src/internals.ts",
      react: "src/react.ts",
   },
   output: [
      {
         dir: "dist",
         entryFileNames: "[name].cjs",
         format: "cjs",
         sourcemap: true,
      },
      {
         dir: "dist",
         entryFileNames: "[name].mjs",
         format: "esm",
         sourcemap: true,
      },
   ],
   external: [],
   plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
         tsconfig: "./tsconfig.json",
         declaration: true,
         declarationDir: "dist",
         include: ["**/*.ts", "**/*.tsx", "**/*.d.ts"],
      }),
   ],
};
