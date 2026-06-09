import oxfmtBase from "./base.ts";

import type { OxfmtConfig } from "oxfmt";

/* ============================================================================================= */

const oxfmtNext = {
  //
  ...oxfmtBase,

  bracketSameLine: false,
  embeddedLanguageFormatting: "auto",
  htmlWhitespaceSensitivity: "css",
  jsxSingleQuote: false,
  singleAttributePerLine: false,

  //
} satisfies OxfmtConfig;

/* ============================================================================================= */

export default oxfmtNext;
