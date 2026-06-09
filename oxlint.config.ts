import { defineConfig } from "oxlint";

import oxlintLib from "./src/configs/oxlint/lib.ts";

import type { OxlintConfig } from "oxlint";

/* ============================================================================================= */

const oxlintConfig: OxlintConfig = defineConfig({ ...oxlintLib });

/* ============================================================================================= */

export default oxlintConfig;
