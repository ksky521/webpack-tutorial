//devServer.config.js
const path = require('path');
module.exports = {
    port: 3000,
    contentBase: path.join(__dirname, 'public'),
    before() {},
    hot: true,
    hotOnly: false,
    proxy: {
        '/api': 'http://localhost:3000'
    }
};
