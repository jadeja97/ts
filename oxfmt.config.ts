import { defineConfig } from "oxfmt";

import { lib } from "./src/configs/oxfmt/index.ts";

import type { OxfmtConfig } from "./src/configs/oxfmt/types.ts";

/* ============================================================================================= */

const oxfmtConfig: OxfmtConfig = defineConfig({ ...lib });

/* ============================================================================================= */

export default oxfmtConfig;
