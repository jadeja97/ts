import { defineConfig } from "oxlint";

import oxlintLib from "./src/configs/oxlint/lib.ts";
import { deepMergeObj } from "./src/lib/operations.ts";

import type { OxlintConfig } from "oxlint";

/* ============================================================================================= */

const oxlintConfig: OxlintConfig = defineConfig(
  deepMergeObj(oxlintLib, {
    rules: {
      "import/no-relative-parent-imports": "off",
    },
  } satisfies OxlintConfig),
);

/* ============================================================================================= */

export default oxlintConfig;
