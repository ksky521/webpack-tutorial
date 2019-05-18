let {AsyncSeriesHook} = require('tapable');
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapPromise(
    '1',
    name =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(1);
                //resolve();
                reject();
            }, 1000);
        })
);
queue.tapPromise(
    '2',
    (name, callback) =>
        new Promise(resolve => {
            setTimeout(() => {
                console.log(2);
                resolve();
            }, 2000);
        })
);
queue.tapPromise(
    '3',
    (name, callback) =>
        new Promise(resolve => {
            setTimeout(() => {
                console.log(3);
                resolve();
            }, 3000);
        })
);
queue.promise('zpu').then(
    err => {
        console.log(err);
        console.timeEnd('cost');
    },
    err => {
        console.log(err);
        console.timeEnd('cost');
    }
);
