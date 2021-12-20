module.exports = {
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
      'import/no-anonymous-default-export': ['error', {
        'allowArray': false,
        'allowArrowFunction': false,
        'allowAnonymousClass': false,
        'allowAnonymousFunction': true,
        'allowCallExpression': true, // The true value here is for backward compatibility
        'allowLiteral': false,
        'allowObject': true
      }]
  }
}