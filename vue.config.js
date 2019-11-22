module.exports = {
    publicPath: './',
    //false使源码不会暴露在浏览器中,生产环境刚需,打包后也不会生成.map文件
    productionSourceMap: false
        // devServer: {
        //     proxy: {
        //         '/api': {
        //             target: 'http://120.78.75.14',
        //             ws: true,
        //             changeOrigin: true,
        //             pathRewrite: {
        //                 '^/api': '' //通过pathRewrite重写地址，将前缀/api转为/
        //             }
        //         }
        //     }

    // }

}