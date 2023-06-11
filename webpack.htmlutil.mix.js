const mix = require('laravel-mix');
require('mix-env-file');

mix
  .ts('htmlutil/src/index.ts', 'htmlutil/dist/index.js')
  .sass('htmlutil/src/app.scss', 'htmlutil/dist/app.css')
  .env(process.env.ENV_FILE)
  .sourceMaps('true');


