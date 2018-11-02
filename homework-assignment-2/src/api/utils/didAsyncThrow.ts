/**
 * Tells if the async function passed as parameter throws or not.
 *
 * @param {Function} fn Async function to listen to throw
 * @returns {boolean} If the function did throw
 */
export const didAsyncThrow = async (
  fn: (...args: any[]) => Promise<any>,
): Promise<boolean> => await fn().then(() => false, () => true)
