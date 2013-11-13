var express = require('express');
var login = require('./routes/login');
var move = require('./routes/move');
var http = require('http');
var path = require('path');
var expressValidator = require('express-validator');

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
app.set('port', process.env.PORT || 3000);
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

app.get('/', login.new_friends);
app.get('/logout', login.logout);

app.post('/login', login.login);
app.post('/signup', login.signup);
app.post('/new_friends', login.new_friends);
app.post('/profile', login.profile);
app.post('/edit_profile', login.edit_profile);
app.post('/messages', login.messages);
app.post('/message_profile', login.message_profile);
app.post('/letterbox', login.letterbox);
app.post('/more', login.more);
app.post('/notice', login.notice);
app.post('/help', login.help);
app.post('/version', login.version);
app.post('/contact', login.contact);

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


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
