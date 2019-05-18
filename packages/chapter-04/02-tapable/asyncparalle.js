let {AsyncParallelHook} = require('tapable');
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapAsync('1', (name, callback) => {
    setTimeout(() => {
        console.log(1);
        callback();
    }, 1000);
});
queue.tapAsync('2', (name, callback) => {
    setTimeout(() => {
        console.log(2);
        callback();
    }, 2000);
});
queue.tapAsync('3', (name, callback) => {
    setTimeout(() => {
        console.log(3);
        callback();
    }, 3000);
});
queue.callAsync('zpu', err => {
    console.log(err);
    console.timeEnd('cost');
});


let hookPromise = new AsyncParallelHook(['name']);
console.time('cost');
hookPromise.tapPromise('1', function (name, callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(1);
            resolve();
        }, 1000)
    });
});
hookPromise.tapPromise('2', function (name, callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(2);
            resolve();
        }, 2000)
    });
});
hookPromise.tapPromise('3', function (name, callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(3);
            resolve();
        }, 3000)
    });
});
hookPromise.promise('zpu').then(() => {
    console.timeEnd('cost');
})
