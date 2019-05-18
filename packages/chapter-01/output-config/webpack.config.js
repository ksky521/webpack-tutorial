module.exports = [
    {
        output: {
            library: 'myLib',
            filename: 'var.js',
            libraryTarget: 'var'
        }
    },
    {
        output: {
            library: 'myLib',
            filename: 'assign.js',
            libraryTarget: 'assign'
        }
    },
    {
        target: 'node',
        output: {
            library: 'myLib',
            filename: 'this.js',
            libraryTarget: 'this'
        }
    },
    {
        output: {
            library: 'myLib',
            filename: 'window.js',
            libraryTarget: 'window'
        }
    },
    {
        target: 'node',
        output: {
            library: 'myLib',
            filename: 'global.js',
            libraryTarget: 'global'
        }
    },
    {
        output: {
            library: 'myLib',
            filename: 'commonjs.js',
            libraryTarget: 'commonjs'
        }
    },
    {
        output: {
            library: 'myLib',
            filename: 'amd.js',
            libraryTarget: 'amd'
        }
    },
    {
        output: {
            library: 'myLib',
            filename: 'umd.js',
            libraryTarget: 'umd'
        }
    },
    {
        output: {
            library: 'myLib',
            filename: 'commonjs2.js',
            libraryTarget: 'commonjs2'
        }
    },

    {
        output: {
            library: 'myLib',
            filename: 'umd2.js',
            libraryTarget: 'umd2'
        }
    },
    {
        output: {
            library: 'myLib',
            filename: 'commonjs-module.js',
            libraryTarget: 'commonjs-module'
        }
    },
    {
        output: {
            library: 'myLib',
            filename: 'jsonp.js',
            libraryTarget: 'jsonp'
        }
    }
];
