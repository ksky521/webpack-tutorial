const WebpackDeepScopeAnalysisPlugin = require('./node_modules/webpack-deep-scope-plugin').default;
const HTMLWebpackPlugin = require('./node_modules/html-webpack-plugin');
module.exports = {
    devtool: 'source-map',
    entry: {
        index: './src/index.js',
        classEntry: './src/class-entry.js',
        sideEffect: './src/side-effect.js'
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             use: [
    //                 {
    //                     loader: 'babel-loader',
    //                     options: {
    //                         presets: [
    //                             [
    //                                 '@babel/preset-env',
    //                                 {
    //                                 }
    //                             ]
    //                         ]
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // plugins: [new WebpackDeepScopeAnalysisPlugin(), new HTMLWebpackPlugin()]
};
