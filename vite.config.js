import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from "path";

export default defineConfig({
    optimizeDeps: {
        include: ['@vue/runtime-dom'],
    },
    resolve: {
        alias: {
            'vue': '@vue/runtime-dom',
            '@js': path.resolve('./resources/js'),
            '@scss': path.resolve('./resources/scss'),
            '@src': path.resolve('./resources/js/src'),
            '@fonts': path.resolve('./resources/fonts'),
            '@images': path.resolve('./resources/images'),
        },
    },
    // For development
    server: {
        host: true,
        port: 8000, // This is the port which we will use in docker
        watch: {
            usePolling: true
        }
    },
    plugins: [
        laravel({
            input: ['./resources/scss/app.scss', './resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
