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
    "prettier/prettier": "warn",
    "no-console": ["error", { allow: ["error"] }],
    camelcase: "warn",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "function-expression",
      },
    ],

    // typescript rules
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/await-thenable": "warn",
    "@typescript-eslint/require-await": "warn",

    // import rules
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: [".*"],
            message:
              'Please do not use relative imports. Use "@/..." instead. If this breaks something, disable the rule for that file only.',
          },
        ],
      },
    ],
  },
};
