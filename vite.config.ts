import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

import { peerDependencies } from "./package.json";
import viteLib, { createInputEntries } from "./src/configs/vite/lib.ts";
import { deepMergeObj } from "./src/lib/operations.ts";
import copyFolders from "./src/plugins/vite/copy-folders.ts";
import removeFolders from "./src/plugins/vite/remove-folders.ts";

import type { UserConfig } from "vite";

/* ============================================================================================= */

const viteConfig: UserConfig = defineConfig(
  //
  deepMergeObj(viteLib({ peerDependencies }), {
    //

    /* ============================================================================================
      BUILD
    ============================================================================================ */

    build: {
      // tansformer options
      rolldownOptions: {
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

    /* ============================================================================================
      PLUGINS
    ============================================================================================ */

    plugins: [
      //
      dts(),

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
      removeFolders(import.meta.dirname, ["./dist/src"]),
    ],
  }),
);

/* ============================================================================================= */

export default viteConfig;
