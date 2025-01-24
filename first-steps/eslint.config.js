/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const tsParser = require("@typescript-eslint/parser");
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const globals = require("globals");

module.exports = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },

    rules: {
      "@/semi": ["error"],
      "@typescript-eslint/no-explicit-any": 2,
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-case-declarations": "off",
    },
  }
);
