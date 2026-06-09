import { throwError } from "./logger.ts";

/* ============================================================================================= */

/**
 * put the app to sleep for defined time for artificial delay to improve the UX
 *
 * @param time - time for artificial delay (default `250)
 */
// oxlint-disable-next-line require-await
export const sleep = async (time = 250): Promise<void> => {
  //
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

/* ============================================================================================= */

/**
 * extracts extensions from a string pattern like ".ext" or ".{ext1,ext2}"
 *
 * @param str - The pattern string (e.g., "*.{ts,tsx}")
 */
export const extractExtensions = (str: string) => {
  // regex explanation:
  // 1. \.          : Match a literal dot
  // 2. \{?         : Optionally match an opening curly brace
  // 3. ([\w,]+)    : Capture group for the extensions (alphanumeric and commas)
  // 4. \}?         : Optionally match a closing curly brace
  // 5. $           : Ensure we are at the end of the string
  const match = /\.(\{?[\w,]+\}?)$/.exec(str);

  if (!match) {
    return throwError(`extension(s) are required! :: ${str}`);
  }

  // match[1] contains the extension part (e.g., "ts" or "{ts,tsx}")
  // we remove '{' and '}' and split by comma
  return match[1].replaceAll(/[{}]/g, "").split(",");
};
