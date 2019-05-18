const {SyncWaterfallHook} = require('tapable');
const hook = new SyncWaterfallHook(['arg0', 'arg1']);
hook.tap('1', (arg0, arg1) => {
    console.log(arg0, arg1, 1);
    return 1;
});
hook.tap('2', (arg0, arg1) => {
    console.log(arg0, arg1, 2);
    return 2;
});
hook.tap('3', (arg0, arg1) => {
    // 这里 arg0 = 2
    console.log(arg0, arg1, 3);
    // 等同于 return undefined
});
hook.tap('4', (arg0, arg1) => {
    // 这里 arg0 = 2 还是2
    console.log(arg0, arg1, 4);
});
hook.call('Webpack', 'Tapable');
/*
Webpack Tapable 1
1 'Tapable' 2
2 'Tapable' 3
2 'Tapable' 4 */

const hook2 = new SyncWaterfallHook(['name']);
hook2.tap('1', data => {
    console.log(data, 1);
    return 1;
});
hook2.tap('2', data => {
    console.log(data, 2);
    // 没有 return 则等同于 return undefined
});
hook2.tap('3', data => {
    // 这里还是 1，3
    console.log(data, 3);
});
hook2.call(0);
