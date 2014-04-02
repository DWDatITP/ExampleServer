var http  = require('http');
var fs    = require('fs');
var url   = require('url');

console.log('Starting server');

var server = http.createServer(function(req, res){
	var pathname = url.parse(req.url).pathname;
	console.log('pathname:',pathname);

	if (pathname === '/') {
		pathname = '/index.html';
	}

  var filepath = __dirname + '/public' + pathname;
  console.log('Filepath: ', filepath);

	fs.readFile(filepath, function(err, data){
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/html'});
			res.write('Caught Error: ' + err);
			res.end();
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			res.end();
		}
	});
});

var port = Number(process.env.PORT || 5000);
console.log('Listening on port',port);
server.listen(port);