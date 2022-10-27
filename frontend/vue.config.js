const { defineConfig } = require("@vue/cli-service");
const webpack = require('webpack');
 

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            fallback: {
                "buffer": require.resolve('buffer/'),
                "assert": false,
                "stream": false,
                "util": false
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
              }),
        ],
    },
});

