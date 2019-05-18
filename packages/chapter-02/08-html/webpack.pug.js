const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.pug'
        })
    ],
    module: {
        rules: [{test: /\.pug$/, loader: ['html-loader', 'pug-html-loader']}]
    }
};
