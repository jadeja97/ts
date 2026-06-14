/**
 * recursive object where each key maps to a nested object or a final value.
 */
export interface NestedObject<T> {
  /**
   * dynamic key for a nested branch or leaf value.
   */
  [key: string]: NestedObject<T> | T;
}

/* ============================================================================================= */

/**
 * use `AnyFunction` instead of banned `Function` type as it's too wide
 */
export type AnyFunction = (...args: unknown[]) => unknown;

/* ============================================================================================= */

/**
 * use `AnyObject` instead of `object`
 */
export type AnyObject = Record<string, unknown>;

/* ============================================================================================= */

/**
 * use `AnyArray` instead of `Array`
 */
export type AnyArray = unknown[];

/* ============================================================================================= */

/**
 * primitive data types
 */
export type Primitive = string | number | boolean | bigint | symbol | null | undefined;
