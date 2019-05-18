const http = require('http');
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(req.headers['user-agent']);
});

http.createServer(app).listen(3000);
