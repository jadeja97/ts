import type { AnyArray, AnyFunction, AnyObject } from "../types/data.ts";

/* ============================================================================================= */

/**
 * checks if the provided data is a string.
 *
 * @param arg - the data to check.
 *
 * @returns `true` if the data is a string, otherwise `false`.
 */
export const isStr = (arg: unknown): arg is string => {
  return typeof arg === "string";
};

/* ============================================================================================= */

/**
 * checks if the provided data is a number.
 *
 * @param arg - the data to check.
 *
 * @returns `true` if the data is a number, otherwise `false`.
 */
export const isNum = (arg: unknown): arg is number => {
  return typeof arg === "number";
};

/* ============================================================================================= */

/**
 * checks if the provided data is a function.
 *
 * @param arg - the data to check.
 *
 * @returns `true` if the data is a function, otherwise `false`.
 */
export const isFn = (arg: unknown): arg is AnyFunction => {
  return typeof arg === "function";
};

/* ============================================================================================= */

/**
 * checks if the provided data is an array.
 *
 * @param arg - the data to check.
 *
 * @returns `true` if the data is an array, otherwise `false`.
 */
export const isArr = (arg: unknown): arg is AnyArray => {
  return Array.isArray(arg);
};

/* ============================================================================================= */

/**
 * checks if the provided data is an object (not an array, or null).
 *
 * @param arg - the data to check.
 *
 * @returns `true` if the data is an object, otherwise `false`.
 */
export const isObj = (arg: unknown): arg is AnyObject => {
  return Boolean(arg) && typeof arg === "object" && !isArr(arg);
};
