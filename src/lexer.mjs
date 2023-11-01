import lexer from "universal-lexer";

import { builtinTypes } from "./check.mjs";
import spec from "./spec.mjs";
import { cleanup, withv } from "./utility.mjs";

export default function lex(input) {
  //const tokenizer = lexer.compileFromFile("./spec.yaml");
  const tokenizer = lexer.compile(spec);
  const result = tokenizer(input);

  if (result.error) {
    console.log(result);
    throw new Error(result.error);
  }

  const tokens = cleanup(result.tokens);
  const list = [];

  while (true) {
    if (tokens.length < 1) {
      break;
    }

    const objectType = tokens.shift();
    if (objectType.type !== "ObjectType") {
      throw new Error(
        `Expected token of type 'ObjectType' but found '${objectType.type}'.`
      );
    }

    const objectName = tokens.shift();
    if (!objectName || objectName.type !== "Name") {
      throw new Error(
        "Expected 'Name' token after 'ObjectType' but found none."
      );
    }

    if (builtinTypes.includes(objectName.data.value)) {
      throw new Error(
        `Cannot declare '${objectName.data.value}' because this is the name of a built-in type.`
      );
    }

    const objectBase = {
      type: objectType.data.value,
      name: objectName.data.value,
    };

    if (objectBase.type === "object") {
      if (withv(tokens.shift(), (v) => !v || v.type !== "BracketOpen")) {
        throw new Error("Expected open bracket after object initialisation.");
      }

      const fields = {};
      while (true) {
        if (tokens.length < 1) {
          throw new Error("Expected more tokens.");
        }

        const fieldType = tokens.shift();
        if (!fieldType) {
          throw new Error("Expected token but found none.");
        }

        if (fieldType.type === "BracketClose") {
          if (!withv(tokens.shift(), (v) => v && v.type === "Semicolon")) {
            throw new Error("Expected semicolon after object declaration.");
          }

          list.push({
            ...objectBase,
            fields,
          });
          break;
        }

        if (fieldType.type !== "FieldType") {
          throw new Error(
            `Expected token of type 'FieldType' but found '${objectType.type}'.`
          );
        }

        const fieldName = tokens.shift();
        if (!fieldName || fieldName.type !== "Name") {
          throw new Error("Expected 'Name' token but found none.");
        }

        if (!withv(tokens.shift(), (v) => v && v.type === "Semicolon")) {
          throw new Error("Expected semicolon after field declaration.");
        }

        if (!!fields[fieldName.data.value]) {
          throw new Error("Found two declarations of one field.");
        }

        const isRequired = fieldType.data.value.at(-1) === "?";

        fields[fieldName.data.value] = {
          type: isRequired
            ? fieldType.data.value.substring(0, fieldType.data.value.length - 1)
            : fieldType.data.value,
          required: isRequired,
        };
      }
    } else if (objectBase.type === "union") {
      if (!withv(tokens.shift(), (v) => v && v.type === "Equals")) {
        throw new Error(
          "Expected 'Equals' token after in union type declaration."
        );
      }

      const unions = [];

      const firstUnionElement = tokens.shift();
      if (
        !(
          firstUnionElement &&
          (firstUnionElement.type === "FieldType" ||
            firstUnionElement.type === "Name")
        )
      ) {
        throw new Error("Expected 'FieldType' or 'Name' token but found none.");
      }

      unions.push(firstUnionElement.data.value);

      while (true) {
        if (tokens.length < 1) {
          throw new Error("Expected more tokens.");
        }

        if (withv(tokens.at(0), (v) => v && v.type === "Semicolon")) {
          tokens.shift();
          break;
        }

        if (!withv(tokens.shift(), (v) => v && v.type === "Seperator")) {
          throw new Error("Expected 'Seperator' token in union type.");
        }

        const unionElement = tokens.shift();
        if (!unionElement || unionElement.type !== "FieldType") {
          throw new Error("Expected 'FieldType' token but found none.");
        }

        unions.push(unionElement.data.value);
      }

      list.push({
        ...objectBase,
        unions,
      });
    } else {
      throw new Error(`Unknown object type '${objectBase.type}'.`);
    }
  }

  return list;
}
