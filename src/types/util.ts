/**
 * recursive object where each key maps to a nested object or a final value.
 */
export interface NestedObject<T> {
  /**
   * dynamic key for a nested branch or leaf value.
   */
  [key: string]: NestedObject<T> | T;
}

/**
 * package version pattern
 *
 * - "1.0.0",
 * - "1.0.0-alpha.0"
 */
export type PackageVersion = `${number}.${number}.${number}${`-${string}.${number}` | ""}`;

/**
 * primitive data types
 */
export type Primitive = string | number | boolean | bigint | symbol | null | undefined;

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

/**
 * extend recursive structural mapper. K is the union of keys that MUST be required.
 */
// oxlint-disable-next-line typescript/no-explicit-any
export type Extend<T, K extends keyof T = never> = T extends (...args: any[]) => any
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
          // oxlint-disable-next-line typescript/no-explicit-any
        } & Record<string, any>
      : PrimitiveWithAutocomplete<T>;
