"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const url = require("url");
const PORT = 3000;
const getPath = (req) => url.parse(req.url).path;
const setCommonHeaders = (res) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
};
const server = http.createServer((req, res) => {
    const path = getPath(req);
    setCommonHeaders(res);
    switch (path) {
        case '/hello':
            res.writeHead(200);
            res.end(JSON.stringify({ data: 'Welcome!' }));
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({ errors: [{ message: 'Invalid route.' }] }));
            break;
    }
});
server.listen(PORT, _ => {
    console.log(`Server listening on port ${PORT}`);
});
