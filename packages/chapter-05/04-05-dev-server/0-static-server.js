const http = require('http');
const express = require('express');

const devServerConfig = require('./devServer.config.js');
const {port = 3000, contentBase} = devServerConfig;
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

// 最后，创建server，并且输出地址
const server = http.createServer(app);
server.listen(port, () => {
    console.log('Listening on %j', server.address());
});
