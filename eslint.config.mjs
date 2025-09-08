import js from "@eslint/js";
import globals from "globals";
import jest from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022, // Support for dynamic imports and other modern features
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es6,
        ...globals.node,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      "semi": ["error", "always"]
    }
  },
  {
    files: ["test/**/*.js"],
    plugins: {
      jest: jest
    },
    languageOptions: {
      ecmaVersion: 2022, // Match the same version for consistency
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es6,
        ...globals.node,
        ...globals.jest,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jest.configs.recommended.rules,
      "semi": ["error", "always"]
    }
  }
];
