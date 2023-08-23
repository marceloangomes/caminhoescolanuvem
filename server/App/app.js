import { CacheNodeFacade } from './Data/CacheNodeFacade.js';
import {IsValidCacheImplementation} from './Data/CacheInterface.js';
import { GetData } from './Data/Data.js'
import http from 'http';

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer(async (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    let cache = new CacheNodeFacade()
    if(IsValidCacheImplementation(cache)){
        const data = await GetData(cache);    
        res.end(JSON.stringify(data));
    }else
        throw Error('Erro no componente: CacheNodeFacade');
})

server.listen(port, hostname, () => {
    
})
