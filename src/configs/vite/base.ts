import type { UserConfig } from "vite";

/* ============================================================================================= */

const viteBase: UserConfig = {
  build: {
    minify: "oxc",
    target: ["chrome109", "firefox109", "edge109", "safari16.3"],
    emptyOutDir: true,
    outDir: "dist",
    sourcemap: false,

    rolldownOptions: {
      // force these to be external (don't bundle them)
      external: [
        // exclude all node in-built modules
        /^node:/,
      ],
    },
  },
};

/* ============================================================================================= */

export default viteBase;
