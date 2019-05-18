require.ensure(['./hello.js', './weak.js'], require => {
    /* ... */
});
require.ensure(['./hello.js', './lazy.js'], require => {
    /* ... */
});
