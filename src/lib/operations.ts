import { error, log, printBlankLine, printSeparator, throwError } from "./logger.ts";
import { isArr, isObj } from "./types.ts";

import type { AnyObject } from "../types/data.ts";

/* ============================================================================================= */

/**
 * recursively merges the properties of the source object into the target object.
 *
 * @param target - the target object to merge into. Must be an object.
 * @param source - the source object to merge from. Must be an object.
 *
 * @returns `source` object deep (nested) merge into `target` object.
 *
 * @throws { TypeError } if either `target` or `source` is not an object.
 */
export const deepMergeObj = <T extends object, U extends object>(target: T, source: U) => {
  //
  if (!isObj(target)) {
    return throwError("target must be an object");
  }
  if (!isObj(source)) {
    return throwError("source must be an object");
  }

  for (const key in source) {
    //
    if (!Object.hasOwn(source, key)) {
      continue;
    }

    const targetValue = target[key];
    const sourceValue = source[key];

    if (key in target && isObj(targetValue) && isObj(sourceValue)) {
      deepMergeObj(targetValue, sourceValue);
    } else {
      (target as AnyObject)[key] = sourceValue;
    }
  }

  return target as T & U;
};

/* ============================================================================================= */

/**
 * creates a deep copy of the given data using `structuredClone`.
 *
 * if the input is not an object or array, the original data is returned.
 *
 * @param data - the data to be copied. Can be an object or array.
 *
 * @returns a deep copy of the input data.
 *
 * @throws { DataCloneError } if any part of the input data (i.e., function) is not serializable.
 */
export const deepCopy = <T>(data: T): T => {
  //
  try {
    //
    if (isObj(data) || isArr(data)) {
      return structuredClone(data);
    }
    //
  } catch (err) {
    printSeparator();
    error("DEEP COPY :: Any part of the input data is not serializable.");
    printBlankLine();
    log(data);
    printSeparator();
    return throwError(err);
  }

  return data;
};

/* ============================================================================================= */

/**
 * returns a fresh RegExp instance cloned from the provided input. This ensures the internal
 * `lastIndex` state is reset to `0`, making the regex safe to reuse with stateful flags like `g` or
 * `y` across multiple operations (e.g. `test`, `replace`, `exec`), particularly in long-lived
 * runtimes such as HMR or shared modules.
 *
 * The returned RegExp preserves: - pattern source - flags (g, i, m, s, u, y, d, etc.)
 *
 * @example
 *   fresh(LCH_COLOR_FORMAT_PATTERN).test(rawColor);
 *   text.replace(fresh(LCH_COLOR_FORMAT_PATTERN), transformer);
 *
 * @param regex - The RegExp instance to clone.
 *
 * @returns A new RegExp instance with identical pattern and flags.
 */
// reset lastIndex via new instance
export const freshRegex = (regex: RegExp | string) => {
  return new RegExp(regex);
};
