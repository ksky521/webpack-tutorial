const webpack = require('webpack');

const vendors = ['react', 'react-dom'];

module.exports = {
    mode: 'production',
    entry: {
        // 定义程序中打包公共文件的入口文件vendor.js
        vendor: vendors
    },
    output: {
        filename: '[name].[chunkhash].js',
        library: '[name]_[chunkhash]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]_[chunkhash]',
            context: __dirname
        })
    ]
};
