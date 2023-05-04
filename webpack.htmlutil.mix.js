const mix = require('laravel-mix');

mix
  .ts('htmlutil/src/multi-pulldown.ts', 'htmlutil/dist/multi-pulldown.js')
  .ts('htmlutil/src/calc-multi-detail.ts', 'htmlutil/dist/calc-multi-detail.js')
  .sass('htmlutil/src/app.scss', 'htmlutil/dist/app.css')
  .sourceMaps('true');

