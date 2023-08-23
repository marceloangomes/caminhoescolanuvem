export {CacheNodeFacade}
import NodeCache from 'node-cache';

class CacheNodeFacade {
    constructor() {
        this.cache = new NodeCache();        
    }

    getItem(key) {
        return this.cache.get(key);
    }

    setItem(key, value, ttl = undefined) {
        this.cache.set(key, value);
        if(ttl)
            this.cache.setTTL(key, ttl);
    }

    removeItem(key) {
        this.cache.del(key);
    }

    clear() {
        this.cache.flushAll();
    }
}
