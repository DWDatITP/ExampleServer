var http = require('http');

console.log('Starting server');

var server = http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<h1>Hello World</h1>');
});

var port = Number(process.env.PORT || 5000);
console.log('Listening on port',port);
server.listen(port);