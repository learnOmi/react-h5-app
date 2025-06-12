const { override, fixBabelImports, addWebpackAlias, addPostcssPlugins} = require('customize-cra');
const path = require('path');
const px2viewport = require('postcss-px-to-viewport');

const babelPlugin = fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: "es/components",
    style: false
})

const webPackAlias = addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '@scss': path.resolve(__dirname, 'src','assets', 'styles')
})

const postcssPlugin = addPostcssPlugins([
    px2viewport({
        viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
    })
])


module.exports = override(
    babelPlugin,
    webPackAlias,
    postcssPlugin
);