module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript'],
  parserOptions: {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-constructor': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'no-nested-ternary': 'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'off',
    'no-bitwise': 'off',
    'object-curly-newline': ['error', { consistent: true }],
    'arrow-parens': ['error', 'always'],
    'guard-for-in': 'off',
    'linebreak-style': 'off',
    'func-names': 'off',
    'operator-linebreak': ['error', 'after'],
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': 'off',
    'eqeqeq':'off'
  },
  globals: {
    vue: true,
    $: true,
    AMap: true,
    require: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.d.ts'],
      },
    },
  },
};
