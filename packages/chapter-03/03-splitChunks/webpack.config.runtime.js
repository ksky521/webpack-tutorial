module.exports = {
    mode: 'production',
    entry: {
        main: './src/entry.js'
    },
    output: {
        filename: '[name].[chunkhash:8].js'
    },
    optimization: {
        // runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            minSize: 1000
        }
    }
};
