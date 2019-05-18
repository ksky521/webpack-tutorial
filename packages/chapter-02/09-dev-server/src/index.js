
document.getElementById('app').innerHTML = 'hello dev server';
if (module.hot) {
    // 通知 webpack改模块接受 hmr
    module.hot.accept(err => {
        if (err) {
            console.error('Cannot apply HMR update.', err);
        }
    });
}
