const OFF = 0;
const ERROR = 'error';
const tests = ['**/*.spec.{js,ts,tsx,jsx}', '**/test/**'];
const typescript = ['**/*.{tsx,ts}'];
const javascript = ['**/*.{jsx,js}'];
const testSetup = ['**/test/setupTests.{js,ts}'];

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  env: {
    'jest/globals': true,
    browser: true
  },
  plugins: ['prettier', 'jest'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // Typescript rules
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/prefer-interface': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/interface-name-prefix': OFF,
    '@typescript-eslint/no-unused-vars': [ERROR, { ignoreRestSiblings: true }],

    // React rules
    'react/no-multi-comp': OFF,
    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-props-no-spreading': OFF,
    'react/destructuring-assignment': [
      'error',
      'always',
      { ignoreClassFields: true }
    ],

    // Import rules
    'import/prefer-default-export': OFF,
    'import/no-named-as-default': OFF,
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: [...tests, ...testSetup] }
    ]
  },
  overrides: [
    {
      files: typescript,
      rules: {
        // Allow for Triple-Slash Directives
        'spaced-comment': [ERROR, 'always', { markers: ['/'] }],
        // Allow type imports from 'Models' module
        'import/no-unresolved': [ERROR, { ignore: ['^Models$'] }],
        'no-param-reassign': OFF,
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
            mjs: 'never'
          }
        ]
      }
    },
    {
      files: [...typescript, ...tests],
      rules: {
        'react/prop-types': OFF
      }
    },
    {
      files: [...tests, ...testSetup],
      rules: {
        '@typescript-eslint/no-object-literal-type-assertion': OFF,
        '@typescript-eslint/no-var-requires': OFF,
        'react/destructuring-assignment': OFF,
        'prefer-destructuring': OFF
      }
    },
    {
      files: javascript,
      rules: {
        '@typescript-eslint/no-var-requires': OFF
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
};
