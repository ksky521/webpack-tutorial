let {AsyncParallelBailHook} = require('tapable');
let queue = new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapAsync('1',(name, callback) => {
    console.log(1);
    callback();
});
queue.tapAsync('2',(name, callback) => {
    console.log(2);
    callback("22");
});
queue.tapAsync('3',(name, callback) => {
    console.log(3);
    callback();
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});