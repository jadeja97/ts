import { defineConfig } from "oxlint";

import { lib } from "./src/configs/oxlint/index.ts";

import type { OxlintConfig } from "./src/configs/oxlint/types.ts";

/* ============================================================================================= */

const oxlintConfig: OxlintConfig = defineConfig({ ...lib });

/* ============================================================================================= */

export default oxlintConfig;
