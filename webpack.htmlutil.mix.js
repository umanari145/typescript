const mix = require('laravel-mix');

mix
  .ts('htmlutil/src/index.ts', 'htmlutil/dist/index.js')
  .sass('htmlutil/src/app.scss', 'htmlutil/dist/app.css')
  .sourceMaps('true');

