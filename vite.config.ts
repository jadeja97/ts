import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

import { peerDependencies } from "./package.json";
import { viteLib as viteLibFn, createInputEntries, dtsOptions } from "./src/configs/vite/lib.ts";
import { deepMergeObj } from "./src/lib/operations.ts";
import copyFolders from "./src/plugins/vite/copy-folders.ts";

import type { UserConfig } from "vite";

/* ============================================================================================= */

const viteLib = viteLibFn({ peerDependencies });

const viteConfig: UserConfig = defineConfig(
  //
  deepMergeObj(viteLib, {
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
      dts(dtsOptions),

      //
      copyFolders(import.meta.dirname, [
        {
          src: "./src/configs/ts",
          dest: "./dist/configs/ts",
        },
      ]),
    ],
  }),
);

/* ============================================================================================= */

export default viteConfig;
