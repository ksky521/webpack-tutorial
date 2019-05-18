const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const ModernModePlugin = require('./ModernModePlugin');
const webpackPromise = webpackConfig => {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                console.error(err);
                reject();
                return;
            }
            if (stats.hasErrors()) {
                const info = stats.toJson();
                console.error(info.errors);
                reject();
                return;
            }
            resolve(stats);
        });
    });
};

const modernConfig = merge.smart(webpackConfig, {
    output: {filename: '[name]-modern-[chunkhash].js'},
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {esmodules: true}
                            }
                        ]
                    ],
                    plugins: ['babel-plugin-transform-dynamic-import-default']
                }
            }
        ]
    }
});

webpackConfig.plugins.push(new ModernModePlugin({targetDir: __dirname + '/dist', isModernBuild: false}));
modernConfig.plugins.push(new ModernModePlugin({targetDir: __dirname + '/dist', isModernBuild: true}));

webpackPromise(webpackConfig)
    .then(stats => Promise.all([Promise.resolve(stats), webpackPromise(modernConfig)]))
    .then(([legacyStats, modernStats]) => {
        // 输出老版本打包
        console.log(legacyStats.toString({chunks: false, modules: false, colors: true}));
        // 输出 modern 版本打包
        console.log(modernStats.toString({chunks: false, modules: false, colors: true}));
    })
    .catch(e => console.log(e));

// Promise.all([webpackPromise(webpackConfig), webpackPromise(modernConfig)])
//     .then(([legacyStats, modernStats]) => {
//         // 输出老版本打包
//         console.log(legacyStats.toString({chunks: false, modules: false, colors: true}));
//         // 输出 modern 版本打包
//         console.log(modernStats.toString({chunks: false, modules: false, colors: true}));
//     })
//     .catch(e => console.log(e));
