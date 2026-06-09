import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

/* ============================================================================================= */

/**
 * copies entire folders and its contents to a destination folders (post build)
 *
 * @param dirname - `import.meta.dirname`
 * @param folders - an array of folder object containing `src` and `dest` property
 */
const vitePluginRemoveFolders = (dirname: string, folders: string[]) => {
  return {
    name: "vite-plugin-remove-folders",
    apply: "build",
    enforce: "post",

    closeBundle() {
      for (const folder of folders) {
        if (existsSync(resolve(dirname, folder))) {
          rmSync(resolve(dirname, folder), { recursive: true, force: true });
        }
      }
    },
  };
};

/* ============================================================================================= */

export default vitePluginRemoveFolders;
