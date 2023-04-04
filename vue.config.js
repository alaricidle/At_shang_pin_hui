const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = defineConfig({
    productionSourceMap: false,
    transpileDependencies: true,
    lintOnSave: false, //关闭代码限制
    devServer: {
        proxy: {
            '/api': {
                target: "http://gmall-h5-api.atguigu.cn"
            }
        }
    },
    configureWebpack: {
        resolve: {
            fallback: {
                fs: false,
                crypto: require.resolve("crypto-browserify")
            }
        },
        plugins: [new NodePolyfillPlugin()],
    },
})