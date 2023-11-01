import fs from "fs";

import generateTypeScript from "./generators/ts.mjs";

export default function generateCode(lexResult, language, outputFile) {
  let generator;
  switch (language) {
    case "ts":
      generator = generateTypeScript;
      break;
    default:
      throw new Error(`Could not find generator for '${language}'.`);
  }

  const resultCode = generator(lexResult);

  fs.writeFileSync(outputFile, resultCode);
}
