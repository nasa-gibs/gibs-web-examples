'use strict';

const neostandard = require('neostandard');

module.exports = [
  ...neostandard({
    env: ['browser', 'node'],
    semi: true,
    globals: {
      Cesium: 'readonly',
      gibs: 'readonly',
      google: 'readonly',
      L: 'readonly',
      mapboxgl: 'readonly',
      Microsoft: 'readonly',
      ol: 'readonly',
      proj4: 'readonly',
      olms: 'readonly'
    }
  }),
  {
    rules: {
      '@stylistic/space-before-function-paren': 'off',
      '@stylistic/object-curly-spacing': ['error', 'always']
    }
  },
  {
    files: ['examples/**/*.js'],
    rules: {
      'no-new': 'off'
    }
  }
];
