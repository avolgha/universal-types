# Universal Types

Create types ones, use anywhere.

## Usage

1) Install the package via your package manager. (I use pnpm here)

```shell
$ pnpm add @avolgha/universal-types
```

2) After the installation, you can import the script from your JavaScript

```javascript
import universalTypes from "@avolgha/universal-types";
import fs from "fs";

universalTypes(
  fs.readFileSync("types.ut", "utf-8"),
  "ts",
  "types.ts"
);
```

## TODO

There are many bottlenecks in this project. The main thing is that we currently
only support one programming language. If you like, you can add more languages
yourself. Other things can be found here:

- [ ] more programming languages
- [ ] add documentation for `spec.yaml`
- [ ] add cli to generate types (*help wanted!*)
- [ ] editor support
  - [ ] create a *good* syntax file for Sublime Text
  - [ ] VS-Code
  - [ ] Neovim / Vim
- [ ] optimisation (*there should be many things you could optimise...*)
