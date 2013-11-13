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
	res.render('profile', {});
};

/************* edit profile ****************/
exports.edit_profile_move = function(req, res) {
	res.render('edit_profile', {});
};

/************* messages ****************/
exports.messages_move = function(req, res) {
	res.render('messages', {});
};

/************* message profile ****************/
exports.message_profile_move = function(req, res) {
	res.render('message_profile', {});
};

/************* letterbox ****************/
exports.letterbox_move = function(req, res) {
	res.render('letterbox', {});
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