import { resolve } from "node:path";

import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

import { peerDependencies } from "./package.json";
import { viteLib as viteLibFn, createInputEntries } from "./src/configs/vite/lib.ts";
import copyFolders from "./src/plugins/vite/copy-folders.ts";
import removeFolders from "./src/plugins/vite/remove-folders.ts";

/* ============================================================================================= */

const viteLib = viteLibFn({ peerDependencies });

const viteConfig = defineConfig({
  //
  ...viteLib,

  /* ==============================================================================================
		BUILD
	============================================================================================== */

  build: {
    //
    ...viteLib.build,

    // tansformer options
    rolldownOptions: {
      //
      ...viteLib.build?.rolldownOptions,

      input: createInputEntries({
        dirname: import.meta.dirname,
        entries: [
          "src/configs/**/*.ts",
          "src/lib/**/*.ts",
          "src/plugins/**/*.ts",
          "src/types/**/*.ts",
        ],
      }),
    },
  },

  /* ==============================================================================================
		ALIAS
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
    dts({
      entryRoot: "src",
      outDirs: "dist",
    }),

    //
    copyFolders(import.meta.dirname, [
      {
        src: "./src/configs/ts",
        dest: "./dist/configs/ts",
      },
      {
        src: "./dist/src",
        dest: "./dist",
      },
    ]),

    //
    removeFolders(import.meta.dirname, ["./dist/src", "./dist/_virtual"]),
  ],
});

/* ============================================================================================= */

export default viteConfig;
