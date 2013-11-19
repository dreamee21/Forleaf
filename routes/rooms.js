var chat = require('./chat');

module.exports = function(app){
	var io = require('socket.io').listen(app);
	io.configure(function() {
		io.set('log level', 3);
		io.set('transports', [
			'websocket',
			'htmlfile',
			'xhr-polling',
			'jsonp-polling']);
	});

	var Room = io.of('/room').on('connection', function(socket){
		var joinedRoom = null;
		socket.on('join', function(data){
			if(chat.hasRoom(data.roomName)){
				joinedRoom = data.roomName;
				socket.join(joinedRoom);
				socket.emit('joined', {idx: data.user_idx});
				socket.broadcast.to(joinedRoom).emit('joined', {idx:data.user_idx});
				chat.joinRoom(joinedRoom, data.user_idx);
			}
			else socket.emit('joined', {});
		});
		socket.on('message', function(data){
			if(joinedRoom){
				socket.broadcast.to(joinedRoom).json.send(data);
			}
		});
		socket.on('leave', function(data){
			if(joinedRoom){
				chat.leaveRoom(joinedRoom, data.idx);
				socket.leave(joinedRoom);
			}
		});
	});
}

//server = http.createServer(app).listen(4000);

/*io.sokcets.on('connection', function (socket){
	console.log("client id = " + socket.id);
	client[socket.id] = socket;
	socket.on
})*/