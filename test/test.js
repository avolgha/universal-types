import fs from "fs";
import universalTypes from "../src/index.mjs";

const inputFile = "./test/sample.ut";
const inputContent = fs.readFileSync(inputFile, "utf-8");

universalTypes(inputContent, "ts", "./test/output.ts");
