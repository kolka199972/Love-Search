module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'object-curly-spacing': 'off',
    'space-before-function-paren': 'off',
    'multiline-ternary': 'off',
    indent: 'off'
  }
}
