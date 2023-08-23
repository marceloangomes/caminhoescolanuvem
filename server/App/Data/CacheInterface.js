export {IsValidCacheImplementation}

const Cache = {
    getItem: function(key) {},
    setItem: function(key, value) {},
    removeItem: function(key) {},
    clear: function() {}
  };

  function IsValidCacheImplementation(cache) {
    for (const method of Object.keys(Cache)) {
      if (typeof cache[method] !== 'function') {
        return false;
      }
    }
    return true;
  }
  