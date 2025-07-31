import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
   input: {
      index: "src/index.ts",
      internals: "src/internals.ts",
   },

   output: {
      dir: "dist",
      sourcemap: true,
   },

   plugins: [
      typescript({
         target: "ES2018",
         declaration: true,
         declarationDir: "dist",
      }),
   ],
};
