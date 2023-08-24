
import { CacheNodeFacade } from './Data/CacheNodeFacade.js';
import {IsValidCacheImplementation} from './Data/CacheInterface.js';
import http from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    
        res.end(JSON.stringify(data));
    
})

server.listen(port, hostname, () => {
    
})
