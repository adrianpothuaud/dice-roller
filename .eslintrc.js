module.exports = {
  'env': {
    'browser': true,
    'cypress/globals': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'google',
    'plugin:cypress/recommended',
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'cypress',
  ],
  'rules': {
  },
};
