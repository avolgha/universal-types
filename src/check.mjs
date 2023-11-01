export const builtinTypes = ["Int", "Float", "Bool", "String", "Char"];

/**
 * @param {import("./types.mjs").UT_Type[]} result
 */
export default function checkLexResult(result) {
  const foundTypes = new Set();
  for (const object of result) {
    if (foundTypes.has(object.name)) {
      throw new Error(`Found double declaration of type '${object.name}'.`);
    }

    if (object.type === "object") {
      for (const { type } of Object.values(object.fields)) {
        foundTypes.add(type);
      }
    } else if (object.type === "union") {
      for (const union of object.unions) {
        foundTypes.add(union);
      }
    }
  }

  const givenTypes = result.map((type) => type.name);

  for (const type of foundTypes) {
    if (builtinTypes.includes(type)) {
      continue;
    }

    if (givenTypes.includes(type)) {
      continue;
    }

    throw new Error(
      `Could not find type '${type}' which is neither built-in nor created.`
    );
  }
}
