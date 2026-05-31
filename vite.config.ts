import { resolve } from "node:path";

import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

import copyFolders from "./src/plugins/vite/copy-folders";

/* ============================================================================================= */

const viteConfig = defineConfig({
  //

  /* ==============================================================================================
		BUILD
	============================================================================================== */

  build: {
    //
    minify: "oxc",
    target: ["chrome109", "firefox109", "edge109", "safari16.3"],
    emptyOutDir: true,
    outDir: "dist",
    sourcemap: true,

    // mark as library
    lib: {
      entry: {
        types: resolve(import.meta.dirname, "./src/types/index.ts"),
        oxfmt: resolve(import.meta.dirname, "./src/configs/oxfmt/index.ts"),
        oxlint: resolve(import.meta.dirname, "./src/configs/oxlint/index.ts"),
        lib: resolve(import.meta.dirname, "./src/lib/index.ts"),
        "vite-plugins": resolve(import.meta.dirname, "./src/plugins/vite/index.ts"),
      },

      // minify whitespace is disabled for es format
      // https://vite.dev/config/build-options#build-minify
      formats: ["es"],
    },

    // tansformer options
    rolldownOptions: {
      external: [
        // add all the node in-built modules list here which are used
        "node:fs",
        "node:path",
      ],
    },
  },

  /* ==============================================================================================
		ALIASE
	============================================================================================== */

  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },

  /* ==============================================================================================
		PLUGINS
	============================================================================================== */

  plugins: [
    //
    dts(),

    //
    copyFolders(import.meta.dirname, [
      {
        src: "./src/configs/ts",
        dest: "./dist/src/configs/ts",
      },
    ]),
  ],
});

/* ============================================================================================= */

export default viteConfig;
