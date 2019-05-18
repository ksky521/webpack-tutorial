let { AsyncSeriesWaterfallHook } = require('tapable');
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tapAsync('1', (name, callback) => {
    setTimeout(() => {
        console.log(name);
        callback(null, 1);
    }, 1000)
});
queue.tapAsync('2', (data, callback) => {
    setTimeout(() => {
        console.log(data);
        callback(null, 2);
    }, 2000)
});
queue.tapAsync('3', (data, callback) => {
    setTimeout(() => {
        console.log(data);
        callback(null, 3);
    }, 3000)
});
queue.callAsync('zpu', err => {
    console.log(err);
    console.timeEnd('cost');
});