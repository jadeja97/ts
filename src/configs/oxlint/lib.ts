import base from "./base.ts";

import type { OxlintConfig } from "./types.ts";

/* ============================================================================================= */

const eslintIdLength = base.rules["eslint/id-length"];
eslintIdLength[1].exceptions = [...eslintIdLength[1].exceptions, "h", "m", "p", "w", "y", "z"];

const lib = {
  ...base,
  rules: {
    ...base.rules,
    "eslint/id-length": eslintIdLength,
  },
} satisfies OxlintConfig;

/* ============================================================================================= */

export default lib;
