export { default as debounce } from "./debounce.ts";

/**
 * put the app to sleep for defined time for artificial delay to improve the UX
 *
 * @param time - time for artificial delay (default `250)
 */
// oxlint-disable eslint/require-await
export const sleep = async (time = 250): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
