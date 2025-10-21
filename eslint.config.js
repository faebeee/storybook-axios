import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  // stylistic.configs.recommended,xw
  // importPlugin.flatConfigs.recommended,
  // importPlugin.flatConfigs.typescript,
  { ignores: ['dist', 'lib/legacy', 'storybook-static'] },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // Always try to resolve types under `<root>@types` directory even if it doesn't contain any source code, like `@types/unist`
          project: ['packages2/*/tsconfig.json', 'apps/**/*/tsconfig.json']
        }
      }
    },
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic
    },
    rules: {
      '@typescript-eslint/no-namespace': ['off'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/extra-semi': ['off'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/comma-dangle': ['off'],
      'comma-dangle': ['off'],
      '@stylistic/member-delimiter-style': [
        'warn',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false
          },
          multilineDetection: 'brackets'
        }
      ],
      '@stylistic/multiline-ternary': ['error', 'never'],
      '@stylistic/brace-style': ['error', '1tbs'],
      'object-curly-spacing': ['error', 'always'],
      'template-tag-spacing': ['error', 'always'],
      'quotes': ['error', 'single']
    }
  }
]);
