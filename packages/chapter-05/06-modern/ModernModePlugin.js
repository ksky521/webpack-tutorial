const fs = require('fs-extra');
const path = require('path');

// https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc
/* eslint-disable max-len,quotes */
const safariFix = `!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();`;
/* eslint-enable max-len,quotes */

class ModernModePlugin {
    constructor({targetDir, isModernBuild}) {
        // 接受Plugin 实例化时候传入的 options

        this.targetDir = targetDir;
        this.isModernBuild = isModernBuild;
    }

    apply(compiler) {
        // 这是 Webpack Plugin 的核心apply函数
        // 接收的是 comipler 对象
        if (!this.isModernBuild) {
            // 根据参数，进入不同的打包逻辑
            this.applyLegacy(compiler);
        } else {
            this.applyModern(compiler);
        }
    }

    applyLegacy(compiler) {
        const ID = 'html-legacy-bundle';
        // 添加 compiler 对象的 Hook compilation，可以得到 compilation 对象
        compiler.hooks.compilation.tap(ID, compilation => {
            // 按照 v3 版本的 API 绑定htmlWebpackPluginAlterAssetTags Hook
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(ID, async (data, cb) => {
                // 使用 fs-extra 的 ensureDir 方法，如果不存在路径则创建，类似 mkdir -p 方法
                await fs.ensureDir(this.targetDir);
                // data.plugin 是 html-webpack-plugin 插件的实例，options 可以得到对应的配置项
                // 得到 html 的 name
                const htmlName = path.basename(data.plugin.options.filename);
                // 得到html 文件路径
                const htmlPath = path.dirname(data.plugin.options.filename);
                // 拼接临时文件的路径
                const tempFilename = path.join(this.targetDir, htmlPath, `legacy-assets-${htmlName}.json`);
                // 调用 fs-extra 的 mkdirp 方法，先创建目录结构，相当于 mkdir -p
                await fs.mkdirp(path.dirname(tempFilename));
                // 将 data.body 内容格式化写到tempFilename文件
                await fs.writeFile(tempFilename, JSON.stringify(data.body));
                cb();
            });
        });
    }

    applyModern(compiler) {
        const ID = 'html-modern-bundle';
        // 添加 compiler 对象的 Hook compilation，可以得到 compilation 对象
        compiler.hooks.compilation.tap(ID, compilation => {
            // 按照 v3 版本的 API 绑定htmlWebpackPluginAlterAssetTags Hook
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(ID, async (data, cb) => {
                // 首先将 data.body 中的 js 添加上 <script type="module"> 用于 modern 浏览器识别使用
                data.body.forEach(tag => {
                    if (tag.tagName === 'script' && tag.attributes) {
                        tag.attributes.type = 'module';
                    }
                });

                // 将 head 中的 link preload 资源更换成 modulepreload <link rel="modulepreload">
                data.head.forEach(tag => {
                    if (tag.tagName === 'link' && tag.attributes.rel === 'preload' && tag.attributes.as === 'script') {
                        tag.attributes.rel = 'modulepreload';
                    }
                });

                // 得到 htmlName，实际是为了得到legacy 打包阶段生成的临时文件的路径
                const htmlName = path.basename(data.plugin.options.filename);
                // 得到 html 路径 ，实际是为了得到legacy 打包阶段生成的临时文件的路径
                const htmlPath = path.dirname(data.plugin.options.filename);
                // 拼接得到 legacy 打包阶段生成的临时文件
                const tempFilename = path.join(this.targetDir, htmlPath, `legacy-assets-${htmlName}.json`);
                // 读取 legacy 打包阶段生成的临时文件
                const legacyAssets = JSON.parse(await fs.readFile(tempFilename, 'utf-8')).filter(
                    a => a.tagName === 'script' && a.attributes
                );
                // 给 legacyAssets 的script 标签加上 nomodule 属性，保证 modern 浏览器不能用
                legacyAssets.forEach(a => {
                    a.attributes.nomodule = '';
                });

                // 插入 Safari 10 nomodule polyfill
                data.body.push({
                    tagName: 'script',
                    closeTag: true,
                    innerHTML: safariFix
                });
                // 将 legacyAssets添加到 modern 阶段生成的 data.body 上
                data.body.push(...legacyAssets);
                // 删除临时文件
                await fs.remove(tempFilename);
                cb();
            });
            // 租后是替换掉空的`nodemodule=''`属性
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(ID, data => {
                data.html = data.html.replace(/\snomodule="">/g, ' nomodule>');
            });
        });
    }
}

ModernModePlugin.safariFix = safariFix;
module.exports = ModernModePlugin;
