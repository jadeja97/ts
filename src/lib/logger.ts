/**
 * throws an error with the provided message.
 *
 * @param err - the error message to throw.
 */
export const throwError = <T>(err: T) => {
  //
  let errMsg: string;

  if (err instanceof Error) {
    errMsg = err.message;
  } else if (typeof err === "string") {
    errMsg = err;
  } else {
    errMsg = String(err);
  }

  throw new Error(errMsg);
};

/* ============================================================================================= */

/**
 * prints a message to the console.
 *
 * this will bypass `eslint/no-console`
 *
 * @param msg - the message to print.
 */
export const { log, warn, error, info, debug, dir } = console;

/* ============================================================================================= */

/**
 * prints a separator line to the console.
 *
 * @param separator - the character to use for the separator (default is "─").
 * @param count - the number of times to repeat the separator character (default is 80).
 */
export const printSeparator = (separator = "─", count = 80) => {
  log(separator.repeat(count));
};

/* ============================================================================================= */

/**
 * print a blank line to the console.
 */
export const printBlankLine = () => {
  log("");
};
