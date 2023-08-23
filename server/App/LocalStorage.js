export {LocalStorageMock}

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }

    clear() {
        this.store = {};
    }
}

// global.localStorage = new LocalStorageMock(); // Assign the mock to the global object

// // Now you can use localStorage methods as usual, even in your tests
// console.log(localStorage.getItem('key')); // Outputs: null
// localStorage.setItem('key', 'value');
// console.log(localStorage.getItem('key')); // Outputs: value
// localStorage.removeItem('key');
// console.log(localStorage.getItem('key')); // Outputs: null
