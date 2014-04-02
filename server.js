var http  = require('http');
var fs    = require('fs');

console.log('Starting server');

function getFilepath(url){
  var filepath = require('url').parse(url).pathname;
  if (filepath === '/') {
    filepath = '/index.html';
  }

  filepath = __dirname + '/public' + filepath;

  console.log('Getting filepath from url: ' + url + '. Filepath: ' + filepath);
  return filepath;
}

function handleError(err, res){
  res.writeHead(500, {'Content-Type': 'text/html'});
  res.write('Handled Error: ' + err);
  res.end();
}

var server = http.createServer(function(req, res){
  var filepath = getFilepath(req.url);

  // read 
  fs.readFile(filepath, function(err, data){
  	if (err) {
      console.log('Failed to read file at path:' + filepath);
      handleError(err, res);
  	} else {
  		res.writeHead(200, {'Content-Type': 'text/html'});
      
      // Write the data that we read from the file
  		res.write(data);
  		res.end();
  	}
	});
});

var port = Number(process.env.PORT || 5000);
console.log('Listening on port',port);
server.listen(port);