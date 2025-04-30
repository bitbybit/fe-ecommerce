import globals from 'globals'
import js from '@eslint/js'
import { configs as tsConfigs } from 'typescript-eslint'
import pluginPromise from 'eslint-plugin-promise'
import { flatConfigs as pluginImportConfigs } from 'eslint-plugin-import'
import pluginJsdoc from 'eslint-plugin-jsdoc'
import prettierConfigs from 'eslint-config-prettier/flat'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginReact from 'eslint-plugin-react'
import * as pluginReactHooks from 'eslint-plugin-react-hooks'

const rules = {
  '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/explicit-function-return-type': 'error',
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    { accessibility: 'explicit', overrides: { constructors: 'off' } }
  ],
  '@typescript-eslint/member-ordering': 'error',
  'class-methods-use-this': 'error',
  'unicorn/better-regex': 'warn',
  'unicorn/prevent-abbreviations': [
    'error',
    {
      replacements: {
        env: {
          environment: false
        }
      }
    }
  ],
  'max-lines-per-function': ['error', 40],
  'no-restricted-imports': [
    2,
    {
      paths: [
        {
          name: 'react-redux',
          importNames: ['useSelector', 'useStore', 'useDispatch'],
          message: 'Please use pre-typed versions from `src/app/hooks.ts` instead.'
        }
      ]
    }
  ]
}

export default [
  {
    files: ['**/*.{js,mjs,mts,cjs,ts,tsx}'],

    rules,

    settings: {
      'import/resolver': {
        typescript: true,
        node: true
      },
      vitest: {
        typecheck: true
      }
    }
  },

  pluginJsdoc.configs['flat/recommended-typescript'],

  {
    files: ['**/*.ts'],

    plugins: {
      jsdoc: pluginJsdoc
    },

    rules: {
      ...rules,
      'jsdoc/require-param-description': 0,
      'jsdoc/require-property-description': 0,
      'jsdoc/require-returns-description': 0,
      'jsdoc/require-throws': 1
    }
  },

  {
    files: ['**/*.tsx'],

    plugins: {
      jsdoc: pluginJsdoc
    },

    rules: {
      ...rules,
      'jsdoc/require-jsdoc': 0
    }
  },

  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    },

    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },

    ignores: ['node_modules/*', 'dist/*']
  },

  js.configs.recommended,
  ...tsConfigs.recommendedTypeChecked,
  prettierConfigs,
  pluginImportConfigs.recommended,
  pluginImportConfigs.typescript,
  pluginPromise.configs['flat/recommended'],
  pluginUnicorn.configs.recommended,

  {
    name: 'eslint-plugin-react/jsx-runtime',
    ...pluginReact.configs.flat['jsx-runtime']
  },

  pluginReactHooks.configs['recommended-latest']
]
