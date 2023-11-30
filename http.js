var http = require('http');

http.createServer(function (request, response) {
    var body = [];
    console.log(request);
    request.on('data', function (chunk) {
        body.push(chunk);
    });

    request.on('end', function () {
        body = Buffer.concat(body);
    });
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello World\n');
}).listen(8124,()=>{
    console.log('Server running on port 8124');
});