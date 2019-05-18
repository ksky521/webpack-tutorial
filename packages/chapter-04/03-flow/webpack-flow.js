const webpack = require('webpack');
const config = {
    mode: 'development',
    devtool: false,
    // 下面是只有一个entry的情况
    // 没有output则默认输出是到dist的main
    entry: './src/app.js',
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    watch: true
};

// webpack(config, ()=>{});
const compiler = webpack(config);

Object.keys(compiler.hooks).forEach(hookName => {
    const hook = compiler.hooks[hookName];
    if (hook.tap) {
        hook.tap('anyString', () => {
            console.log(`run -> ${hookName}`);
        });
    }
});

compiler.run();
