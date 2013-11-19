var express = require('express');
var login = require('./routes/login');
var move = require('./routes/move');
var new_friend = require('./routes/new_friend');
var profile = require('./routes/profile');
var message = require('./routes/message');
var contact = require('./routes/contact');
var chat = require('./routes/chat');
var expressValidator = require('express-validator');
var nodemailer = require('nodemailer');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

var validator_option = {
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.');
		var root = namespace.shift();
		var formParam = root;
		while(namespace.length){
			formParam += '[' + namespace.shift() +']';
		}
		return {
			param: formParam,
			target: formParam,
			msg: msg,
			value: value,
			result: "failed"
		};
	}
}

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(expressValidator(validator_option));
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.root);
app.get('/logout', login.logout);
app.post('/login', login.login);
app.post('/signup', login.signup);

app.post('/getrequest', new_friend.getrequest);
app.post('/getrecommend', new_friend.getrecommend);
app.post('/getfriendprofile', new_friend.getfriendprofile);
app.post('/set_friend', new_friend.set_friend);

app.post('/getprofile', profile.getprofile);
app.post('/geteditprofile', profile.geteditprofile);
app.post('/insert_profile', profile.insert_profile);
//app.post('/getfrined_idx', profile.getfrined_idx);
//app.post('/edit_profile', login.edit_profile);

app.post('/getmessage', message.getmessage);
app.post('/getfriendprofile', message.getfriendprofile);
app.post('/getletter', message.getletter);
app.post('/inputletter', message.inputletter);
//app.post('/letterbox', login.letterbox);

app.post('/main_move', move.main_move);
app.post('/login_move', move.login_move);
app.post('/signup_move', move.signup_move);
app.post('/new_friends_move', move.new_friends_move);
app.post('/profile_move', move.profile_move);
app.post('/edit_profile_move', move.edit_profile_move);
app.post('/messages_move', move.messages_move);
app.post('/message_profile_move', move.message_profile_move);
app.post('/letterbox_move', move.letterbox_move);
app.post('/more_move', move.more_move);
app.post('/notice_move', move.notice_move);
app.post('/help_move', move.help_move);
app.post('/version_move', move.version_move);
app.post('/contact_move', move.contact_move);
app.post('/friend_session', move.friend_session);
app.post('/request_profile_move', move.request_profile_move);
app.post('/profile_location_move', move.profile_location_move);
app.post('/profile_location_session', move.profile_location_session);
//app.post('/send_mail', contact.send_mail);

app.post('/send_mail', contact.send_mail);
app.post('/upload_profile', profile.upload_profile);

var server = http.createServer(app);
/*app.get('/join/:room', function(req, res){
	var roomIdx = req.params.room;
})*/

app.get('/join/:id', function(req, res){
	var roomName = req.params.id;
	if(chat.hasRoom(roomName)){
	}
	res.render('letterbox', {idx: req.session.idx, friend_idx: req.session.friend_idx, message_idx: req.session.messages_idx});
});

require('./routes/rooms')(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
