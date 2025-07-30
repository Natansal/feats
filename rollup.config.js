import typescript from "@rollup/plugin-typescript";

export default {
   input: {
      index: "src/index.ts",
      internals: "src/internals.ts",
   },
   output: {
      dir: "dist",
      format: "es",
      sourcemap: true,
   },
   plugins: [typescript()],
};
