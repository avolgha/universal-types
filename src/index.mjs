"use strict";

import checkLexResult from "./check.mjs";
import generateCode from "./generator.mjs";
import lex from "./lexer.mjs";

/**
 * @param {string} input
 * @param {"ts"} language
 * @param {string} outputFile
 */
export default function universalTypes(input, language, outputFile) {
  const lexResult = lex(input);

  checkLexResult(lexResult);

  generateCode(lexResult, language, outputFile);
}
