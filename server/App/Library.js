export { Sleep, AsyncForEach, BinarySearchClosest }

const Sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const AsyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

function BinarySearchClosest(sortedList, target) {
    let low = 0;
    let high = sortedList.length - 1;
    let closestIndex = -1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const midValue = sortedList[mid];

        if (midValue === target) {
            return midValue;
        } else if (midValue < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }

        if (closestIndex === -1 || Math.abs(target - midValue) < Math.abs(target - sortedList[closestIndex])) {
            closestIndex = mid;
        }
    }

    return closestIndex;
}

