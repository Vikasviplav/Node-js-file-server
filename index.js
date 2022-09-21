const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 8080

const server = http.createServer((req, res) => {
    if (req.url == '/favicon.ico') {
        res.statusCode = 204

    } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html');
        let path = "." + req.url
        fs.readdir(path, { "encoding": "utf8" }, (err, data) => {
            if (err) {
                const content = fs.readFileSync(path.toString())
                res.end(content)
            } else {
                let resp = ''
                if (data.length == 0) {
                    resp += "<h3>No files in this directory</h3>"
                }
                data.forEach((el) => {
                    resp += `<li style="font-size : 25px"><a href = ${el + "/"}>${el}</a></li>`
                });
                res.end(`<div style="width: 30%; margin: auto; margin-top: 10px; border: 1px solid black; padding: 30px; border-radius: 20px "><h1 style= "text-align :center">NODEJS - FILE SERVER</h1><hr/> <div>${resp}</div></div>`);
            }
        });

    }


})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})