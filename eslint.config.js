import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    env: {
      browser: true,
      es6: true,
    },
    rules: {
      "no-undef": "warn",         // Change 'no-undef' from error to warning
      "no-unused-vars": "warn",   // Change unused variables rule to warning
      // You can adjust other rules here as needed
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
