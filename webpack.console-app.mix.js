const mix = require('laravel-mix');

mix
  .ts('console-app/src/index.ts', 'console-app/dist/index.js')
  .sourceMaps('true');


