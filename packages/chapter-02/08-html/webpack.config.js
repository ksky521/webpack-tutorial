const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    plugins: [new HtmlWebPackPlugin({template: './src/index.html'})]
};
