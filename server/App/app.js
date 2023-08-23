import { GetData } from './Data.js'

//const http = require('http')
import http from 'http';

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer(async (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    const data = await GetDados();
    console.log(data);
    res.end(JSON.stringify(data));
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

const GetDados = async () => {
    return await GetData(null);
}