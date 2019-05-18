// import css from './css/index.css'
// console.log(css, css.toString())

// const css = require('./css/index.css');
// console.log(css, css.toString())


// css modules

import styles from './css/app.css';
console.log(styles)
let element = `
  <div class="${styles.element}">
    <p>CSS Modules</p>
  </div>
`;
document.write(element);
