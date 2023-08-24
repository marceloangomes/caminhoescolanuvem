export { Sleep, AsyncForEach }

const Sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const AsyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
