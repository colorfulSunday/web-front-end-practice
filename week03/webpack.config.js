
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');  // 引入 vue-loader 文件
 
module.exports = {
    entry: './week03/index.js', // 入口文件
    output:{
        filename:'index.js', // 添加哈希值，防止缓存
        path:path.resolve(__dirname,'dist') // 输出文件夹
    },
    plugins: [
        new VueLoaderPlugin(), // 这里 vue 需要额外添加一个插件，将定义的 .js 、 .css 规则应用到 .vue 文件中
    ],
    module:{
        rules:[
            {
                test:/\.vue$/, // 处理 .vue 文件
                loader: 'vue-loader'
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 定义 vue 的重命名
        }
    }
};