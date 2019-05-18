const {SyncBailHook} = require('tapable');
const hook = new SyncBailHook(['name']);
hook.tap('1', name => {
    console.log(name, 1);
});
hook.tap('2', name => {
    console.log(name, 2);
    return 'stop';
});
hook.tap('3', name => {
    console.log(name, 3);
});
hook.call('hello');

/*
hello 1
hello 2
 */

