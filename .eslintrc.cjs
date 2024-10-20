/* eslint-env node */
module.exports = {
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint", "prettier", "simple-import-sort"],
  root: true,
  rules: {
    "prettier/prettier": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "tye"],
    "no-console": "warn",
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
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
};
