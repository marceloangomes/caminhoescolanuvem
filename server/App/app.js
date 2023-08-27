
import http from 'http';
import { Update } from './main.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const url = new URL(req.url, `http://${req.headers.host}`);
    const queryParams = url.searchParams;
    const parameters = queryParams.get('parameters');
    let response = undefined;
    if (parameters) {
        res.statusCode = 200
        response = Update(parameters);
    } else {
        res.statusCode = 422;
        response = { "message": 'There is no parameters.' };
    }
    res.end(JSON.stringify(response));
})

server.listen(port, hostname, () => {

})
