const path = require("path");

module.exports = {
    resolve: {
        alias: {
            '@js': path.resolve('./resources/js'),
            '@scss': path.resolve('./resources/scss'),
            '@src': path.resolve('./resources/js/src'),
            '@fonts': path.resolve('./resources/fonts'),
            '@images': path.resolve('./resources/images'),
        },
    },
    output: {
        chunkFilename: 'js/chunks/[name].js?[hash]'
    }
};
