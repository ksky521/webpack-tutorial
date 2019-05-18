import webpackHotMiddleware from 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
webpackHotMiddleware.subscribe(({action}) => {
    if (action === 'reload') {
        location.reload();
    }
});
