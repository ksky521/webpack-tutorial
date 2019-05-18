const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        list: './src/list.js'
    },
    plugins: [
        new HtmlWebPackPlugin({template: './src/index.html', filename: 'index.html', chunks: ['index']}),
        new HtmlWebPackPlugin({template: './src/list.html', filename: 'list.html', chunks: ['list']})
    ]
};
