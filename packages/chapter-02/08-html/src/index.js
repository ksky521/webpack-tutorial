console.log('I am index.js');
import(/* webpackPrefetch: true */ './lazy').then(lazy => console.log(lazy));
