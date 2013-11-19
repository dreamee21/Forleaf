var mysql_config = require('../sql/mysql_conf').mysql_config;
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var check = require('../node_modules/validator/lib/validator').check;
var sanitize = require('../node_modules/validator/lib/validator').sanitize;
var validator = require('../node_modules/validator/lib/validator').Validator;
var crypto = require('crypto');

function reg_session(req, email, idx){
	req.session.email = email;
	req.session.idx = idx;
}

exports.root = function(req, res){
	console.log("접속자 ip : " + req.ip);
	console.log(req.session);
	if(!req.session.email || !req.session.email.length){
		res.render('login', {success: "success"});
	}
	else{
		res.render('new_friends', {});
	}
	//else{
	//	res.render('login', {});
	//}
};

exports.login = function (req, res) {
	var evt = new EventEmitter();
	var query = require('../sql/login');
	var email = req.body.email;
	var passwd = req.body.passwd;
	var hash = req.headers.cookie;
	var errors = {};

	req.checkBody("email", "계정을 입력하세요.").notEmpty();
	req.checkBody("email", "계정 양식을 맞춰주세요.").isEmail();
	req.checkBody("passwd", "패스워드를 입력하세요.").notEmpty();
	var error = req.validationErrors();
	if(error != null){
		console.log(error);
		errors = error[0];
		res.send(errors);
	}

	var result = {
		email: email,
		passwd: passwd
	}
	query.login(evt, mysql_config, result);
	evt.on('login', function(err, result){
		if(err) throw err;
		if(result.length < 1){
			console.log("Login Fail : email=" + email);
			errors = {result: "failed", msg:"로그인 실패.", target:"email"};
			res.send(errors);
		}
		else if(result.length == 1){
			console.log("Login Success : user_idx = " + result[0].idx + ", email = " + result[0].email);
			/*res.writeHead(200, {
				'Content-Type': 'text/html',
				'Set-Cookie': [
					'email = '+ email
				]
			});*/
			reg_session(req, email, result[0].idx);
			errors = {result: "successed"};
			res.send(errors);
		}
		else{
			console.log("Login Fail : email=" + email);
			//script.alert("Login Fail!");
			//res.redirect('/?status=failed');
			errors = {result: "failed", msg:"로그인 실패.", target:"email"};
			res.send(errors);
		}
	});
};

exports.logout = function(req, res){
	console.log("로그아웃 User Idx : " + req.session.idx);
	delete req.session.email;
	delete req.session.idx;
	res.redirect('/');
}

exports.signup = function(req, res){
	console.log("가입자 ip : " + req.ip);
	var evt = new EventEmitter();
	var query = require('../sql/login');
	var email = req.body.email;
	var passwd = req.body.passwd;
	var name = req.body.name;
	var errors = {};

	req.checkBody("email", "계정을 입력하세요.").notEmpty();
	req.checkBody("email", "계정 양식을 맞춰주세요.").isEmail();
	req.checkBody("passwd", "패스워드를 입력하세요.").notEmpty();
	req.checkBody("name", "이름을 입력하세요.").notEmpty();
	var error = req.validationErrors();
	if(error != null){
		console.log(error);
		errors = error[0];
		res.send(errors);
	}
	else {
		var result = {email: email}
		query.check_email(evt, mysql_config, result);
	}
	evt.on('check_email', function(err, result){
		if(result[0].cnt == 0){
			result = {
			email: email,
			passwd: passwd,
			name: name
			}
			query.signup(evt, mysql_config, result);
		}
		else{
			errors = {result: "failed", msg:"이미 존재하는 계정입니다.", target:"email"};
			res.send(errors);
		}
	})
	evt.on('signup', function(err, result){
		if(err) throw err;
		console.log("회원가입 성공");
		errors = {result: "successed"};
		res.send(errors);
	});
};

/*exports.passwdset = function(req, res) {
	var query;
	var user_idx = req.session.user_idx;

	db_connect = mysql.createConnection(mysql_config);

	db_connect.connect(function(err) {
		if(err)
		{
			console.log("Mysql Connecting Error");
			throw err;
		}
	});
	var password = db_connect.escape(req.body.passwd);

	query = 'UPDATE forleaf_user SET password = PASSWORD(' + password + ') WHERE idx=' + user_idx + ';';
	db_connect.query('USE test');
	db_connect.query(query, function(err, result){
		if(err) throw err;
		res.send("success");
	});
	db_connect.end();
}*/