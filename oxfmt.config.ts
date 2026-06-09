import { defineConfig } from "oxfmt";

import oxfmtLib from "./src/configs/oxfmt/lib.ts";

import type { OxfmtConfig } from "oxfmt";

/* ============================================================================================= */

const oxfmtConfig: OxfmtConfig = defineConfig({ ...oxfmtLib });

/* ============================================================================================= */

export default oxfmtConfig;
