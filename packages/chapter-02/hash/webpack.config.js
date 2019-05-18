module.exports = {
    entry: {
        main: './index.js',
        b: './b.js'
    },
    output: {
        // filename: '[name].[hash].js'
        filename: '[name].[chunkhash].js'
        // filename: '[name].[hash].js'
    }
};
