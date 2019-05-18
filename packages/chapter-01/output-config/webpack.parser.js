module.exports = {
    entry: './src/parser.js',
    output: {
        filename: 'parser.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                parser: {
                }
            }
        ]
    }
};
