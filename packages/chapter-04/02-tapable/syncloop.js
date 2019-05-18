const {SyncLoopHook} = require('./node_modules/tapable/lib');
const hook = new SyncLoopHook(['name']);
let callbackCalledCount1 = 0;
let callbackCalledCount2 = 0;
let callbackCalledCount3 = 0;
let intent = 0;
hook.tap('callback 1', arg => {
    callbackCalledCount1++;
    if (callbackCalledCount1 === 2) {
        callbackCalledCount1 = 0;
        intent -= 4;
        intentLog('</callback-1>');
        return;
    } else {
        intentLog('<callback-1>');
        intent += 4;
        return 'callback-1';
    }
});

hook.tap('callback 2', arg => {
    callbackCalledCount2++;
    if (callbackCalledCount2 === 2) {
        callbackCalledCount2 = 0;
        intent -= 4;
        intentLog('</callback-2>');
        return;
    } else {
        intentLog('<callback-2>');
        intent += 4;
        return 'callback-2';
    }
});

hook.tap('callback 3', arg => {
    callbackCalledCount3++;
    if (callbackCalledCount3 === 2) {
        callbackCalledCount3 = 0;
        intent -= 4;
        intentLog('</callback-3>');
        return;
    } else {
        intentLog('<callback-3>');
        intent += 4;
        return 'callback-3';
    }
});

hook.call('args');

function intentLog(...text) {
    console.log(new Array(intent).join(' '), ...text);
}

/*
<callback-1>
 </callback-1>
 <callback-2>
    <callback-1>
    </callback-1>
 </callback-2>
 <callback-3>
    <callback-1>
    </callback-1>
    <callback-2>
        <callback-1>
        </callback-1>
    </callback-2>
 </callback-3>
 */
