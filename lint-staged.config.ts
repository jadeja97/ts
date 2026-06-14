const lintStagedConfig = {
  // 1. run type checking once for the whole project
  // using a function to prevent file arguments being passed to tsc
  "*.ts": () => {
    return "tsc";
  },

  // 2. run formatting and linting ONLY on the changed files
  "*.{ts,json,md}": ["oxfmt --check --disable-nested-config", "oxlint --disable-nested-config"],
};

/* ============================================================================================= */

export default lintStagedConfig;
