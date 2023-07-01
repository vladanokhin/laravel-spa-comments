const path = require("path");

module.exports = {
    resolve: {
        alias: {
            '@js': path.resolve('./resources/js'),
            '@src': path.resolve('./resources/js/src'),
            '@scss': path.resolve('./resources/scss'),
            '@fonts': path.resolve('./resources/fonts'),
            '@images': path.resolve('./resources/images'),
        },
    },
    output: {
        chunkFilename: 'js/chunks/[name].js?[hash]'
    }
};
