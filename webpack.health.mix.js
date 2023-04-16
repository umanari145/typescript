const mix = require('laravel-mix');

mix
  .ts('health/src/health.ts', 'health/dist/health.js');
