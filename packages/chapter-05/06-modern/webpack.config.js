const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModernModePlugin = require('./ModernModePlugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name]-legacy-[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: 3
                            }
                        ]
                    ],
                    plugins: ['babel-plugin-transform-dynamic-import-default']
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()]
};
