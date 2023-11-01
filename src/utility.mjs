const removableFields = ["Space", "NewLine"];
export function cleanup(tokens) {
  return tokens.filter((token) => !removableFields.includes(token.type));
}

/**
 * You call a function `fn` with a value
 * given by `getter` and return the result
 * of this function.
 *
 * @template T The type of the value you want to provide to the second function.
 * @template R The return type of the whole function.
 * @param {T | () => T} getter The function that gives you the value you put into the second function.
 * @param {(v: T) => R} fn The function that gives you the return result for a given value.
 * @returns {R} The return result of the second function.
 *
 * @example
 * ```javascript
 * const result = withv(
 *    5 * 4,
 *    (v) => v === 20
 * );
 *
 * assert(result === true);
 * ```
 */
export function withv(getter, fn) {
  return fn(typeof getter === "function" ? getter() : getter);
}
