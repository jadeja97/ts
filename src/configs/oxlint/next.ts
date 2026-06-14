import { deepMergeObj } from "../../lib/operations.ts";

import oxlintBase from "./base.ts";

import type { OxlintConfig } from "oxlint";

/* ============================================================================================= */

const eslintIdLength = oxlintBase.rules["eslint/id-length"];
eslintIdLength[1].exceptions = [...eslintIdLength[1].exceptions, "h", "m", "p", "w", "y", "z"];

/* ============================================================================================= */

const oxlintNext = deepMergeObj(oxlintBase, {
  env: {
    browser: true,
  },

  jsPlugins: [
    {
      name: "react-hooks-js",
      specifier: "eslint-plugin-react-hooks",
    },
  ],

  plugins: [...oxlintBase.plugins, "jsx-a11y", "nextjs", "react", "react-perf"],

  rules: {
    "eslint/id-length": eslintIdLength,
    "eslint/no-undefined": "off",
    "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
    "react/forbid-component-props": ["error", { forbid: ["style"] }],
    "react/jsx-filename-extension": ["error", { extensions: ["jsx", "tsx"] }],
    "react/jsx-pascal-case": ["error", { allowAllCaps: true }],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-max-depth": ["error", { max: 6 }],
    "react/no-multi-comp": ["error", { ignoreStateless: true }],
    "react/only-export-components": [
      "error",
      {
        allowExportNames: [
          "dynamicParams",
          "generateMetadata",
          "generateStaticParams",
          "metadata",
          "variants",
        ],
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react-hooks-js/error-boundaries": "error",
    "react-hooks-js/config": "error",
    "react-hooks-js/globals": "error",
    "react-hooks-js/immutability": "error",
    "react-hooks-js/incompatible-library": "error",
    "react-hooks-js/preserve-manual-memoization": "error",
    "react-hooks-js/purity": "error",
    "react-hooks-js/refs": "error",
    "react-hooks-js/set-state-in-effect": "error",
    "react-hooks-js/set-state-in-render": "error",
    "react-hooks-js/static-components": "error",
    "react-hooks-js/unsupported-syntax": "error",
    "react-hooks-js/use-memo": "error",
    "react-perf/jsx-no-jsx-as-prop": "off",
    "react-perf/jsx-no-new-array-as-prop": "off",
    "react-perf/jsx-no-new-function-as-prop": "off",
    "react-perf/jsx-no-new-object-as-prop": "off",
  },
} satisfies OxlintConfig);

/* ============================================================================================= */

export default oxlintNext;
