const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: ['./dev-client.js', './src/index.js'],
    output: {
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html', filename: 'index.html'}),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3000,
        contentBase: '../public',
        watchContentBase: true,
        watchOptions: {
            poll: 2000
        },
        proxy: {
            '/users': {
                target: 'http://jsonplaceholder.typicode.com/',
                changeOrigin: true
            }
        },

        mock: './mock/index.js'
    }
};
