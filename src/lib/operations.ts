import { log, throwError } from "./logger.ts";
import { isArr, isObj } from "./types.ts";

/* ============================================================================================= */

/**
 * recursively merges the properties of the source object into the target object.
 *
 * @param target - The target object to merge into. Must be an object.
 * @param source - The source object to merge from. Must be an object.
 *
 * @returns `source` object deep (nested) merge into `target` object.
 *
 * @throws { Error } If either `target` or `source` is not an object.
 */
export const deepMergeObj = <T, U>(target: T, source: U) => {
  //
  if (!isObj(target)) {
    return throwError("target must be an object");
  }
  if (!isObj(source)) {
    return throwError("source must be an object");
  }

  for (const key in source) {
    if (key in (target as never) && isObj((target as never)[key]) && isObj(source[key])) {
      deepMergeObj<typeof target, typeof source>((target as never)[key], (source as never)[key]);
    } else {
      // oxlint-disable-next-line typescript/no-explicit-any, typescript/no-unsafe-member-access
      (target as any)[key] = source[key];
    }
  }

  return target as T & U;
};

/* ============================================================================================= */

/**
 * creates a deep copy of the given data using `structuredClone`.
 *
 * If the input is not an object or array, the original data is returned.
 *
 * @param data - The data to be copied. Can be an object or array.
 *
 * @returns A deep copy of the input data.
 *
 * @throws { Error } If any part of the input data is not serializable.
 */
export const deepCopy = <T>(data: T): T => {
  //
  try {
    //
    if (isObj(data)) {
      return { ...structuredClone(data) };
    } else if (isArr(data)) {
      return [...structuredClone(data)] as T;
    }
    //
  } catch (error) {
    log("Any part of the input data is not serializable.");
    throwError(error);
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
 *   -fresh(LCH_COLOR_FORMAT_PATTERN).test(rawColor);
 *   -text.replace(fresh(LCH_COLOR_FORMAT_PATTERN), transformer);
 *
 * @param regex - The RegExp instance to clone.
 *
 * @returns A new RegExp instance with identical pattern and flags.
 */
// reset lastIndex via new instance
export const freshRegex = (regex: RegExp | string) => {
  return new RegExp(regex);
};
