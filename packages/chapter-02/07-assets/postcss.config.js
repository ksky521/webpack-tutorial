const postcssSprites = require('postcss-sprites');

module.exports = {
    plugins: [
        postcssSprites({
            spritePath: './src/assets/img/'
        })
    ]
};
