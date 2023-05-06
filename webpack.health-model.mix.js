const mix = require('laravel-mix');

mix
  .ts('health-model/src/index.ts', 'health-model/dist/app.js')
  .sourceMaps('true');

