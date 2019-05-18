const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = [
    {
        entry: './import-loader.js',
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                // plugins: [autoprefixer(['IE 10'])]
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            // 添加 plugin
            new MiniCssExtractPlugin({
                filename: 'no-import-loaders.css'
            })
        ]
    },
    {
        entry: './import-loader.js',
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                // plugins: [autoprefixer(['IE 10'])]
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            // 添加 plugin
            new MiniCssExtractPlugin({
                filename: 'with-import-loaders.css'
            })
        ]
    }
];
