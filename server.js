var http  = require('http');
var fs    = require('fs');

console.log('Starting server');

var server = http.createServer(function(req, res){
	fs.readFile(__dirname + '/indexx.html', function(err, data){
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