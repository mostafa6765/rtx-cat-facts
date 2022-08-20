module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-unused-vars": "off",
    "semi": 0,
    "indent": 0,
    'max-len': 'off',
    "import/prefer-default-export": 'off',
    "no-trailing-spaces": 'off',
    'object-curly-spacing': 'off',
    'dot-notation': 'off',
    'comma-dangle': 'off',
    'quotes': 'off',
    'prefer-destructuring': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
