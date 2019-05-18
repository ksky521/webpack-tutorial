const path = require('path');
const http = require('http');
const express = require('express');
// http-proxy-middleware
const httpProxyMiddleware = require('http-proxy-middleware');
// mock-middleware
const apiMockerMiddleware = require('mocker-api');
// watch file change
const chokidar = require('chokidar');

const devServerConfig = require('./devServer.config.js');
const {port = 3000, contentBase, proxy} = devServerConfig;
const app = express();

// 0. 实现static服务器
// 判断类型，如果是数组，那么就循环添加
if (Array.isArray(contentBase)) {
    contentBase.forEach(item => {
        app.get('*', express.static(item));
    });
} else if (contentBase && typeof contentBase === 'string') {
    app.get('*', express.static(contentBase));
}

// 1. proxy

let proxies = [];
if (Array.isArray(proxy)) {
    proxies = [...proxy];
} else {
    Object.keys(proxy).forEach(key => {
        proxies.push({
            context: key,
            proxyConfig: proxy[key]
        });
    });
}

proxies.forEach(({context, proxyConfig}) => {
    app.use((req, res, next) => {
        const proxyMiddleware = httpProxyMiddleware(context, proxyConfig);
        return proxyMiddleware(req, res, next);
    });
});

// 2. mocker-api

apiMocker(app, path.resolve('./mocker/index.js'));

// 3. webpack

// 3.1. 读取webpack.config.js文件
const webpack = require('webpack');
const webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
// 3.2. 创建compiler对象
const compiler = webpack(webpackConfig);

// 3.3. 添加dev-middleware，使用compiler参数
app.use(
    require('webpack-dev-middleware')(compiler, {
        logLevel: 'warn',
        publicPath: webpackConfig.output.publicPath
    })
);

// 3.4. 添加hot-middleware，使用compiler参数
let webpackHotMiddlewareInstance = require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
});
app.use(webpackHotMiddlewareInstance);

// 3.5
webpackHotMiddlewareInstance.publish({action: 'reload'});

// 最后，创建server，并且输出地址
const server = http.createServer(app);
server.listen(port, () => {
    console.log('Listening on %j', server.address());
});
