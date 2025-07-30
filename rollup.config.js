import typescript from "@rollup/plugin-typescript";

// Define the formats you want to build
const formats = [
   { name: "cjs", ext: ".cjs" },
   { name: "esm", ext: ".mjs" },
];

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
   input: {
      index: "src/index.ts",
      internals: "src/internals.ts",
   },

   // Dynamically generate the output array
   output: formats.map((format) => ({
      dir: "dist",
      format: format.name,
      entryFileNames: `[name]${format.ext}`,
      sourcemap: true,
   })),

   plugins: [
      typescript({
         target: "ES2018",
         declaration: true,
         declarationDir: "dist",
      }),
   ],
};
