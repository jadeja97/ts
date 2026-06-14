import type { AnyFunction, AnyObject } from "./data.ts";

/* ============================================================================================= */

/**
 * ensures IDEs suggest literals but accept any base value.
 */
export type PrimitiveWithAutocomplete<T> = T extends string
  ?
      // oxlint-disable-next-line typescript/ban-types
      T | (string & {})
  : T extends number
    ?
        // oxlint-disable-next-line typescript/ban-types
        T | (number & {})
    : T extends bigint
      ?
          // oxlint-disable-next-line typescript/ban-types
          T | (bigint & {})
      : T extends symbol
        ?
            // oxlint-disable-next-line typescript/ban-types
            T | (symbol & {})
        : T;

/* ============================================================================================= */

/**
 * extend recursive structural mapper. K is the union of keys that MUST be required.
 */
export type Extend<T, K extends keyof T = never> = T extends AnyFunction
  ? T
  : T extends (infer U)[]
    ? Extend<U>[]
    : T extends object
      ? {
          // required keys (from K)
          -readonly [U in K]-?: Extend<T[U]>;
        } & {
          // optional keys (all others)
          -readonly [U in Exclude<keyof T, K>]?: Extend<T[U]>;
          // extendibility
        } & AnyObject
      : PrimitiveWithAutocomplete<T>;
