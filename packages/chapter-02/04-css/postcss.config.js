const autoprefixer = require('autoprefixer');
const precss = require('precss');
const postcssImport = require('postcss-import');

const pr2rem = require('postcss-plugin-pr2rem');

const pr2remConfig = {
    rootValue: 12.42,
    unitPrecision: 1,
    propWhiteList: [],
    propBlackList: ['font-size'],
    selectorBlackList: [],
    ignoreIdentifier: '00',
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
};

module.exports = {
    plugins: [autoprefixer(['IE 10']), pr2rem(pr2remConfig)]
};
