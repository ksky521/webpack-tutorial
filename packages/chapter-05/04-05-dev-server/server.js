const path = require('path');
const http = require('http');
const express = require('express');
// http-proxy-middleware
const httpProxyMiddleware = require('http-proxy-middleware');
// mock-middleware
const apiMockerMiddleware = require('mocker-api');
// hot
const webpackHotMiddleware = require('webpack-hot-middleware');
// dev
const webpackDevMiddleware = require('webpack-dev-middleware');
// watch file change
const chokidar = require('chokidar');

// 输出报告
const report = require('./report');

module.exports = webpackConfig => {
    const devServerConfig = webpackConfig.devServer;
    const {port = 3000, host = '0.0.0.0', contentBase, proxy, mock} = devServerConfig;
    const app = express();

    // 0. 实现static服务器
    // 判断类型，如果是数组，那么就循环添加
    if (Array.isArray(contentBase)) {
        contentBase.forEach(item => {
            app.get('*', express.static(path.resolve(item)));
        });
    } else if (contentBase && typeof contentBase === 'string') {
        app.get('*', express.static(path.resolve(contentBase)));
    }

    // 1. proxy
    Object.keys(proxy).forEach(router => {
        app.use(router, httpProxyMiddleware(proxy[router]));
    });

    // 2. mocker-api
    if (mock) {
        // 这里的mock是mocker-api配置文件路径
        apiMockerMiddleware(app, path.resolve(mock));
    }

    // 3. webpack

    // 3.1. 读取webpack.config.js文件
    const webpack = require('webpack');
    // 3.2. 创建compiler对象
    const compiler = webpack(webpackConfig);

    // 3.3. 添加dev-middleware，使用compiler参数
    app.use(
        webpackDevMiddleware(compiler, {
            logLevel: 'warn',
            publicPath: webpackConfig.output.publicPath
        })
    );

    // 3.4. 添加hot-middleware，使用compiler参数
    const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    });
    app.use(webpackHotMiddlewareInstance);

    // 4. watchContentBase
    if (devServerConfig.watchContentBase) {
        // 判断watchoptions
        const {poll, ignored} = devServerConfig.watchOptions;
        const usePolling = poll ? true : undefined;
        const interval = typeof poll === 'number' ? poll : undefined;
        // 这个是chokidar的options
        const options = {
            ignoreInitial: true,
            persistent: true,
            followSymlinks: false,
            atomic: false,
            alwaysStat: true,
            ignorePermissionErrors: true,
            ignored,
            usePolling,
            interval
        };
        function _watch(watchPath) {
            const watcher = chokidar.watch(watchPath, options);
            watcher.on('change', () => {
                // 使用webpackHotMiddlewareInstance发送reload消息给client
                // client接收消息后reload页面
                webpackHotMiddlewareInstance.publish({action: 'reload'});
            });
        }
        if (Array.isArray(contentBase)) {
            contentBase.forEach(item => {
                _watch(item);
            });
        } else if (contentBase && typeof contentBase === 'string') {
            _watch(contentBase);
        }
    }

    // 6. 增加before支持
    if (typeof devServerConfig.before === 'function') {
        devServerConfig.before(app);
    }

    // 最后，创建server，并且输出地址
    // const server = http.createServer(app);
    // server.listen(port, () => {
    //     console.log(`Listening on http://localhost:${port}`);
    // });

    const ID = 'diy-dev-server';
    return new Promise((resolve, reject) => {
        const server = http.createServer(app);
        const urlForBrowser = `http://${host}:${port}`;
        // 第一次flag，第一次编译就输出log
        let isFirstCompile = true;
        compiler.hooks.done.tap(ID, stats => {
            if (stats.hasErrors()) {
                const info = stats.toJson();
                console.error(info.errors);
                reject(stats);
                return;
            }
            // 这里是默认的 log
            console.log(stats.toString({children: false, modules: false, chunks: false, colors: true}));
            // 下面是我们美化后的 report
            const result = report(
                stats.toJson({
                    all: false,
                    entrypoints: true,
                    assets: true,
                    chunks: true,
                    version: true,
                    timings: true,
                    performance: true
                }),
                webpackConfig
            );
            console.log(result);

            if (isFirstCompile) {
                console.log();
                console.log(`    DevServer running at: ${urlForBrowser}`);
                console.log();
                resolve({
                    server,
                    url: urlForBrowser
                });
            }
        });

        server.listen(port, host, err => {
            if (err) {
                reject(err);
            }
        });
    });
};
