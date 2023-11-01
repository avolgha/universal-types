/** @param {import("../types.mjs").UT_Type[]} lexResult */
export default function generateTypeScript(lexResult) {
  const mapType_table = {
    Int: "number",
    Float: "number",
    Bool: "boolean",
    String: "string",
    Char: "string",
  };
  function mapType(typeName) {
    return mapType_table[typeName] || typeName;
  }

  function mapField(fieldName, fieldData) {
    return `${fieldName}${fieldData.required ? "?" : ""}: ${mapType(
      fieldData.type
    )};`;
  }

  return lexResult
    .map((type) => {
      if (type.type === "object") {
        if (Object.keys(type.fields).length < 1) {
          return `
export interface ${type.name} {
  [key: string]: unknown;
}`;
        }

        return `
export interface ${type.name} {
${Object.keys(type.fields)
  .map((fieldName) => "  " + mapField(fieldName, type.fields[fieldName]))
  .join("\n")}
}`;
      } else if (type.type === "union") {
        return `export type ${type.name} = ${type.unions
          .map((v) => mapType(v))
          .join(" | ")};`;
      } else {
        throw new Error(`Cannot generate code for object type '${type.type}'.`);
      }
    })
    .join("\n\n")
    .trim();
}
