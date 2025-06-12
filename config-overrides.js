const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');
const path = require('path');

const babelPlugin = fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: "es/components",
    style: false
})

const webPackAlias = addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '@scss': path.resolve(__dirname, 'src','assets', 'styles')
})

module.exports = override(
    babelPlugin,
    webPackAlias
);