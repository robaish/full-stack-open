module.exports = {
    'extends': [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended'
    ],
    'plugins': ['react', 'import', 'jsx-a11y'],
    'parserOptions': {
        'ecmaVersion': 2021,
        'sourceType': 'module',
        'ecmaFeatures': {
          'jsx': true
        }
    },
    'env': {
        'es6': true,
        'browser': true,
        'node': true
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
      'react/prop-types': 0,
      'react/display-name': 0
  }
}