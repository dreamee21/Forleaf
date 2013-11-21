var chat = require('./chat');
var geocoder = require('geocoder');
exports.main_move = function(req, res){
	console.log("접속 ip : " + req.ip);
	res.redirect('/');
}

exports.signup_move = function(req, res){
	console.log("회원가입 ip : "+ req.ip);
	res.render('signUp', {});
};

exports.login_move = function(req, res){
	console.log("로그인 ip : " + req.ip);
	res.render('login', {});
}

exports.new_friends_move = function(req, res) {
	res.render('new_friends', {});
};

/************* profile ****************/
exports.profile_move = function(req, res) {
	delete req.session.location;
	delete req.session.locations;
	delete req.session.num;
	delete req.session.render;
	res.render('profile', {});
};

/************* edit profile ****************/
exports.edit_profile_move = function(req, res) {
	console.log(req.session);
	res.render('edit_profile', {});
};

/*exports.edit_profile_move2 = function(req, res) {
	console.log(req.session);
	if(req.session.render>3)	res.render('edit_profile', {});
};*/

exports.profile_location_move = function(req, res) {
	req.session.num = 0;
	req.session.render = 0;
	res.render('pick_location', {location: req.session.location});
};

exports.profile_location_session = function(req, res){
	if(req.session.num == 0)	req.session.locations = req.body.location;
	else						req.session.locations += "," + req.body.location;
	req.session.num++;
	req.session.render++;
	console.log(req.session.num +" "+req.session.locations);
	if(req.session.num > 2){
		req.session.num = 0;
		req.session.location = req.session.locations;
	}
	res.send("successed");
}

/************* messages ****************/
exports.messages_move = function(req, res) {
	res.render('messages', {});
};

/************* message profile ****************/
exports.message_profile_move = function(req, res) {
	res.render('message_profile', {friend_idx: req.session.friend_idx});
};

exports.request_profile_move = function(req, res) {
	res.render('friend_profile', {friend_idx: req.session.friend_idx});
};

exports.friend_session = function(req, res) {
	var message_idx;
	req.session.friend_idx = parseInt(req.body.friend_idx);
	if(Number(req.session.idx) > Number(req.session.friend_idx))	message_idx = req.session.friend_idx + "_" + req.session.idx;
	else															message_idx = req.session.idx + "_" + req.session.friend_idx;
	req.session.message_idx = message_idx;
	/*var idx = req.session.idx;
	if(idx !== ""){
		if(!chat.hasUser(idx)){
			chat.addUser(idx);
		}
	}*/
	res.render('message_profile', {friend_idx: req.session.friend_idx});
};

/************* letterbox ****************/
exports.letterbox_move = function(req, res) {
	var roomName = req.session.message_idx;
	if(roomName && roomName.trim() != ""){
		if(!chat.hasRoom(roomName)) {
			chat.addRoom(roomName);
		}
	}
	res.render('letterbox', {idx: req.session.idx, friend_idx: req.session.friend_idx, message_idx: req.session.messages_idx});
};

/************* more ****************/
exports.more_move = function(req, res) {
	res.render('more', {});
};

/************* notice ****************/
exports.notice_move = function(req, res) {
	res.render('notice', {});
};

/************* help ****************/
exports.help_move = function(req, res) {
	res.render('help', {});
};

/************* version ****************/
exports.version_move = function(req, res) {
	res.render('version', {});
};

/************* contact ****************/
exports.contact_move = function(req, res) {
	res.render('contact', {});
};