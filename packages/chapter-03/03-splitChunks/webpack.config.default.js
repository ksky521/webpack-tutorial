const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js'
    },
    plugins: [new BundleAnalyzerPlugin()]
};
