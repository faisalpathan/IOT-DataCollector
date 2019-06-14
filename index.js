var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs')
var JSONStream = require('JSONStream');
var helper = require('./helper');



server.listen(8002);

io.on('connection', function (socket) {
	try{
		socket.emit('serverConnected', { hello: 'User are you connected' });
		socket.on('clientConnected', function (data) {
		console.log(data);
	   	if(data.status === 'Connected'){
	   		var stream = fs.createReadStream(process.argv[2], {encoding: 'utf8'}),
    		parser = JSONStream.parse('*');
			stream.pipe(parser);
			parser.on('data', function (obj) {
			   const data = helper.checkAndTransFormValues(obj);
			   socket.emit('sendChartData',data)
			});
	   	}
	});
	} catch(error){
		console.log(error);
		return null;
	}
});