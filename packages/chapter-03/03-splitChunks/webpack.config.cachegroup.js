const BundleAnalyzerPlugin = require('./node_modules/webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    mode: 'development',
    entry: {
        cachegroup1: './src/cachegroup-1.js',
        cachegroup2: './src/cachegroup-2.js'
    },
    plugins: [new BundleAnalyzerPlugin()],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    priority: -20
                }
            }
        }
    }
};
