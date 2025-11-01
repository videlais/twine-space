import js from '@eslint/js';
import globals from 'globals';
import jest from 'eslint-plugin-jest';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  {
    ignores: ['node_modules/**', 'build/**', 'coverage/**', 'docs/**']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es6,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
      }
    },
    plugins: {
      jsdoc
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jsdoc.configs.recommended.rules,
      semi: ['error', 'always']
    }
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es6,
        ...globals.node,
        ...globals.jest,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        page: true,
        browser: true,
        context: true,
        puppeteerConfig: true,
        jestPuppeteer: true
      }
    },
    plugins: {
      jest,
      jsdoc
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jest.configs.recommended.rules,
      ...jsdoc.configs.recommended.rules,
      semi: ['error', 'always']
    }
  }
];
