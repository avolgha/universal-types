// Manually generated from "/spec.yaml"

const spec = [
  {
    type: "NewLine",
    regex: "\\r?\\n",
  },
  {
    type: "Space",
    regex: "[ \\t]+",
  },
  {
    type: "ObjectType",
    regex: "(object|union)",
  },
  {
    type: "FieldType",
    regex: "(Int|Float|Bool|String|Char)\\??",
  },
  {
    type: "Name",
    regex: "[a-zA-Z][a-zA-Z0-9]*\\??",
  },
  {
    type: "BracketOpen",
    value: "{",
  },
  {
    type: "BracketClose",
    value: "}",
  },
  {
    type: "Equals",
    value: "=",
  },
  {
    type: "Seperator",
    value: "|",
  },
  {
    type: "Semicolon",
    value: ";",
  },
];

export default spec;
