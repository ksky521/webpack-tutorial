const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    mode: 'production',
    entry: {
        a: './src/a.js',
        b: './src/b.js'
    },
    plugins: [new BundleAnalyzerPlugin()]
};
