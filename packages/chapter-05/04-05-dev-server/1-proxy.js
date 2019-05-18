const http = require('http');
const express = require('express');
const httpProxyMiddleware = require('http-proxy-middleware');

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

// 最后，创建server，并且输出地址
const server = http.createServer(app);
server.listen(port, () => {
    console.log('Listening on %j', server.address());
});
