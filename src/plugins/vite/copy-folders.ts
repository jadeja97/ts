import { existsSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
import { join, resolve } from "node:path";

/* ============================================================================================= */

/**
 * copies entire folders and its contents to a destination folders (post build)
 *
 * @param dirname - `import.meta.dirname`
 * @param folders - an array of folder object containing `src` and `dest` property
 */
const vitePluginCopyFolders = (dirname: string, folders: { src: string; dest: string }[]) => {
  return {
    name: "vite-plugin-copy-folders",
    apply: "build",
    enforce: "post",

    closeBundle() {
      for (const folder of folders) {
        copyFolderSync(resolve(dirname, folder.src), resolve(dirname, folder.dest));
      }
    },
  };
};

/* ============================================================================================= */

/**
 * copies an entire folder and its contents to a destination folder
 *
 * if the destination directory does not exist, it will be created automatically.
 *
 * @param src - the source directory path.
 * @param dest - the destination directory path.
 */
const copyFolderSync = (src: string, dest: string) => {
  //
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    //
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
};

/* ============================================================================================= */

export default vitePluginCopyFolders;
