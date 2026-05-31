import base from "./base.ts";

import type { OxfmtConfig } from "./types.ts";

/* ============================================================================================= */

const next = {
  ...base,
  bracketSameLine: false,
  embeddedLanguageFormatting: "auto",
  htmlWhitespaceSensitivity: "css",
  jsxSingleQuote: false,
  singleAttributePerLine: false,
} satisfies OxfmtConfig;

/* ============================================================================================= */

export default next;
