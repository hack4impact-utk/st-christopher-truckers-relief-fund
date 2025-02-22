/* eslint-env node */
module.exports = {
  // plugins
  plugins: ["@typescript-eslint", "prettier", "simple-import-sort", "react"],

  // default rules
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "plugin:prettier/recommended",
  ],

  // parser rules
  root: true,
  ignorePatterns: [".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    projectService: true,
    tsconfigRootDir: __dirname,
  },

  rules: {
    // formatting / style rules
    "prettier/prettier": "error",
    "no-console": ["error", { allow: ["error"] }],
    camelcase: ["error", { properties: "always" }],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "function-expression",
      },
    ],

    // typescript rules
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/explicit-function-return-type": "error",

    // import rules
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
};
