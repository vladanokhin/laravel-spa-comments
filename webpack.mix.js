const mix = require('laravel-mix');
const webpackConfig = require('./webpack.config')


// Configure webpack
mix.webpackConfig(webpackConfig)

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/scss/app.scss', 'public/css')
    .vue()

// Use version
mix.version();
