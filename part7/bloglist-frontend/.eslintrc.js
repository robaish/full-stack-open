// eslint-disable-next-line no-undef
module.exports = {
    'env': {
        'es6': true,
        'browser': true,
        'jest/globals': true,
        'cypress/globals': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended'
    ],
    'plugins': ['react', 'jest', 'cypress', 'import', 'jsx-a11y'],
    'parserOptions': {
        'ecmaVersion': 2021,
        'sourceType': 'module',
        'ecmaFeatures': {
          'jsx': true
        }
    },
    'rules': {
      'quotes': [
          'error',
          'single'
      ],
      'semi': [
          'error',
          'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
          'error', { 'before': true, 'after': true }
      ],
      'no-console': 0,
      'react/prop-types': 0,
      'react/display-name': 0
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
}