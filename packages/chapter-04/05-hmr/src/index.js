import './style.css';
const $node = document.getElementById('app');
$node.innerHTML = 'Hi，Webpack HMR';

if (module.hot) {
    // 通知 webpack改模块接受 hmr
    module.hot.accept(err => {
        if (err) {
            console.error('Cannot apply HMR update.', err);
        }
    });
}
