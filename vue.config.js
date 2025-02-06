module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/admin':{
                target:'https://jiu.shouxuanzp.cn',
                changeOrigin:true,
                cookieDomainRewrite: {
                    "jiu.shouxuanzp.cn": "localhost"
                },
                headers: {
                    Referer: 'https://jiu.shouxuanzp.cn/admin/order.php'
                },
                cookiePathRewrite: {
                    "/": "/"
                },
                withCredentials: true, // 允许携带 cookie
                pathRewrite:{
                    '^/admin': '/admin' // 路径重写
                }
            }
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}