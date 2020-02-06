module.exports = {
    devServer: {
        // 代理
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:12306',
            }
        }
    },
    outputDir: "./public"
}