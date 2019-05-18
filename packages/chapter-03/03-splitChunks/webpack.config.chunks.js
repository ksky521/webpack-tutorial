const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    mode: 'development',
    entry: {
        a: './src/a.js',
        b: './src/b.js'
    },
    plugins: [new BundleAnalyzerPlugin()],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    }
};
