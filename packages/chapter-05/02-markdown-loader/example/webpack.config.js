const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        index: './index.js',
        test: './test.js'
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    'html-loader',
                    {
                        loader: require.resolve('../index'),
                        options: {
                            simplifiedAutoLink: true,
                            tables: true
                        }
                    }
                ]
            }
        ]
    },
    output: {
        publicPath: 'http://www.example.com/js/'
    },
    plugins: [
        new HTMLWebpackPlugin({chunks: ['index'], filename: 'index.html'}),
        // 没有 chunk 测试
        new HTMLWebpackPlugin({filename: 'no-chunk.html'}),
        new HTMLWebpackPlugin({chunks: ['test'], filename: 'test.html'})
};
