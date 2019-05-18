const HtmlWebpackPlugin = require('html-webpack-plugin');

class PrefetchPlugin {
    constructor() {
        this.name = 'prefetch-plugin';
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(this.name, compilation => {
            const run = this.run.bind(this, compilation);
            if (compilation.hooks.htmlWebpackPluginAfterHtmlProcessing) {
                // html-webpack-plugin v3 插件
                compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(this.name, run);
            } else {
                // html-webpack-plugin v4
                HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(this.name, run);
            }
        });
    }
    run(compilation, data, callback) {
        // 获取 chunks，默认不指定就是 all
        const chunkNames = data.plugin.options.chunks || 'all';
        // 排除需要排除的 chunks
        const excludeChunkNames = data.plugin.options.excludeChunks || [];

        // 所有 chunks 的 Map，用于根据 ID 查找 chunk
        const chunks = new Map();
        // 预取的 id
        const prefetchIds = new Set();
        compilation.chunks
            .filter(chunk => {
                const {id, name} = chunk;
                // 添加到 map
                chunks.set(id, chunk);
                if (chunkNames === 'all') {
                    // 全部的 chunks 都要过滤
                    // 按照 exclude 过滤
                    return excludeChunkNames.indexOf(name) === -1;
                }
                // 过滤想要的chunks
                return chunkNames.indexOf(name) !== -1 && excludeChunkNames.indexOf(name) === -1;
            })
            .map(chunk => {
                const children = new Set();
                // 预取的内容只存在 children 内，不能 entry 就预取吧
                const childIdByOrder = chunk.getChildIdsByOrders();
                for (const chunkGroup of chunk.groupsIterable) {
                    for (const childGroup of chunkGroup.childrenIterable) {
                        for (const chunk of childGroup.chunks) {
                            children.add(chunk.id);
                        }
                    }
                }
                if (Array.isArray(childIdByOrder.prefetch) && childIdByOrder.prefetch.length) {
                    prefetchIds.add(...childIdByOrder.prefetch);
                }
            });

        if (prefetchIds.size) {
            // 获取 publicPath，保证路径正确
            const publicPath = compilation.outputOptions.publicPath || '';
            const prefetchTags = [];
            for (let id of prefetchIds) {
                const chunk = chunks.get(id);
                const files = chunk.files;
                files.forEach(filename => {
                    prefetchTags.push(`<link rel="prefetch" href="${publicPath}${filename}">`);
                });
            }
            // 开始生成 prefetch html片段
            const prefetchTagHtml = prefetchTags.join('\n');

            if (data.html.indexOf('</head>') !== -1) {
                // 有 head，就在 head 结束前添加 prefetch link
                data.html = data.html.replace('</head>', prefetchTagHtml + '</head>');
            } else {
                // 没有 head 就加上个 head
                data.html = data.html.replace('<body>', '<head>' + prefetchTagHtml + '</head><body>');
            }
        }

        callback(null, data);
    }
}

module.exports = PrefetchPlugin;
