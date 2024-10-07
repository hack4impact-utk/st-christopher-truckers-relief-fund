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
  plugins: ["@typescript-eslint", "prettier"],
  root: true,
  rules: {
    "prettier/prettier": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },
};
