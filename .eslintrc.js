module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'unused-imports'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    typescript: {
      alwaysTryTypes: true,
    },
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/default': 0,
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'never',
      },
    ],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'unused-imports/no-unused-imports': 2,
    'class-methods-use-this': 0,
    'lines-between-class-members': [2, 'always', { exceptAfterSingleLine: true }],
    'no-useless-constructor': 0,
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
};
