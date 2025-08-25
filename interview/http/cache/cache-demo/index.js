const http = require('http')
const fs = require('fs')

http.createServer(function (req, res) {
    if (req.url === '/') {
        // index.html
        // async 异步 sync 同步的
        // fs.readFile('./index.html', 'utf8', function(err, data) {
        //     if(err) {
        //         res.end('404 Not Found')
        //     }
        //     res.end(data)
        // })
        // 同步的 性能差点
        const html = fs.readFileSync('./index.html', 'utf8')
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(html)
    }
    if (req.url === '/script.js') {
        const js = fs.readFileSync('./script.js', 'utf8')
        res.writeHead(200, {
            'Content-Type': 'text/javascript',
            'Expires': new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString(),
            // 'Cache-Control': 'max-age=30,public'

        })
        res.end(js)
    }

})
    .listen(8888)
