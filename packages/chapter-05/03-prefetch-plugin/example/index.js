import html from './markdown.md';
console.log(html);

import(/* webpackChunkName: "lazy", webpackPrefetch: true */
'./lazy').then(name => {
    console.log(name);
});
