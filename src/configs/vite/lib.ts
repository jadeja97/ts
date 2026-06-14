import { relative, resolve } from "node:path";

import { glob } from "glob";

import { deepMergeObj, freshRegex } from "../../lib/operations.ts";
import { extractExtensions } from "../../lib/utils.ts";

import viteBase from "./base.ts";

import type { PluginOptions } from "unplugin-dts";
import type { UserConfig } from "vite";

/* ============================================================================================= */

export type ViteLib = (options: { peerDependencies?: Record<string, string> }) => UserConfig;

export const viteLib: ViteLib = ({ peerDependencies = {} }) => {
  //

  return deepMergeObj(viteBase, {
    //

    build: {
      //

      // enable source map for library
      sourcemap: true,

      // mark as library
      lib: {
        // using `config.build.rolldownOptions.input`
        entry: "",

        // minify whitespace is disabled for es format
        // https://vite.dev/config/build-options#build-minify
        formats: ["es"],
      },

      // tansformer options
      rolldownOptions: {
        //
        // force these to be external (don't bundle them)
        external: [
          //
          // @ts-expect-error  iterator issue
          // oxlint-disable-next-line typescript/no-misused-spread
          ...(viteBase.build?.rolldownOptions?.external ?? []),

          // exclude all peerDependencies (as strings or Regex)
          ...Object.keys(peerDependencies).flatMap((dep) => {
            return [dep, freshRegex(`^${dep}/`)];
          }),
        ],

        // input will be added in actual `vite.config.ts`
        // input: createInputEntries({dirname: import.meta.dirname, entries: []})

        output: {
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
        },
      },
    },
  } satisfies UserConfig);
};

/* ============================================================================================= */

export interface CreateInputEntriesOptions {
  /**
   * `import.meta.dirname`
   */
  dirname: string;

  /**
   * paths to create input entry
   */
  entries: string[];
}

export const createInputEntries = ({ dirname, entries }: CreateInputEntriesOptions) => {
  //
  const paths: Record<string, string> = {};

  for (const entry of entries) {
    //
    for (const file of glob.sync(entry)) {
      // 1. get path relative to 'src' (e.g., 'components/button.tsx')
      // 2. remove the extension
      const key = relative("src", file).replace(
        freshRegex(`\\.(${extractExtensions(file).join("|")})$`),
        "",
      );

      // the absolute path to the file
      const value = resolve(dirname, file);

      paths[key] = value;
    }
  }

  return paths;
};

/* ============================================================================================= */

export const dtsOptions: PluginOptions = {
  //
  entryRoot: "src",
  outDirs: "dist",

  compilerOptions: {
    declarationMap: true,
  },

  beforeWriteFile: (filePath, content) => {
    // this forces the file into 'dist/' regardless of subfolder structure
    return {
      filePath: filePath.replace("dist/src", "dist"),
      content,
    };
  },
};

/* ============================================================================================= */

export default viteLib;
