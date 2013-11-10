var mysql = require('mysql');
var script = require('./test');
var db_connect;
var mysql_config = {
	host: 'localhost',
	database: 'forleaf',
	user: 'root',
	password: 'anm30925',
	multipleStatements: true
};
exports.root = function(req, res){
	console.log("접속자 ip : " + req.ip);
	console.log(req.session);
	res.render('login', {});
};

exports.login = function (req, res) {
	var query;
	db_connect = mysql.createConnection(mysql_config);

	db_connect.connect(function (err) {
		if(err){
			console.log("Mysql Connecting Error");
			throw err;
		}
	});

	var email = db_connect.escape(req.body.email);
	var passwd = db_connect.escape(req.body.passwd);
	console.log(req.body);
	query = 'SELECT * FROM user_info WHERE'
		  + ' name=' + email + ' AND passwd=PASSWORD(' + passwd + ');';
	db_connect.query('USE test');
	db_connect.query(query, function(err, result) {
		if(err)	throw err;
		console.log(result);
		if(result.length == 1)
		{
			console.log("Login Success : user_idx = " + result[0].idx + ", email = " + result[0].email);
			req.session.user_idx = result[0].idx;
			req.session.email = result[0].email;
			res.redirect('/');
		}
		else
		{
			console.log("Login Fail : email=" + email);
			script.alert("Login Fail!");
			res.redirect('/');
		}
	});
	db_connect.end();
};

exports.signupmove = function(req, res){
	console.log("회원가입 ip : "+req.ip);
	res.render('signUp', {});
};

exports.signup = function(req, res){
	console.log("접속자 ip : " + req.ip);
	var query, db_connect2;
	db_connect = mysql.createConnection(mysql_config);
	db_connect2 = mysql.createConnection(mysql_config);
	db_connect.connect(function (err) {
		if(err){
			console.log("Mysql Connecting Error");
			throw err;
		}
	});
	var email = db_connect.escape(req.body.email);
	var passwd = db_connect.escape(req.body.passwd);
	var username = db_connect.escape(req.body.username);
	query = 'SELECT * FROM forleaf_user WHERE'
		  + ' email=' + email + ';';
	db_connect.query('USE forleaf');
	db_connect.query(query, function(err, result){
		if(err)	throw err;
		console.log(result);
		if(result.length > 0)
		{
			console.log("Already exist this email");
			alert("Already exist this email"); // javascript:alert('aaa');
			res.redirect('/');
		}
		else
		{
			console.log(username);
			db_connect2.connect(function (err) {if(err) throw err;});
			var query2 = 'INSERT INTO forleaf_user VALUES(NULL, "'+ username+ '", "'+ email + '", PASSWORD(' + passwd + '), "test의 집", 2, 3, "0-0-0", "직장인", 1, 2, 3, "테스트하기", "test_image_1", "000-0000-0000", "최선을 다해 테스트하자", "Project 완성", "swmaestro", 1);';
			db_connect2.query(query2);
			console.log(query2);
			res.redirect('/');
		}
		db_connect2.end();
	});
	db_connect.end();
};//문제 많은 고쳐야함

exports.passwdset = function(req, res) {
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
	db_connect.query('USE forleaf');
	db_connect.query(query, function(err, result){
		if(err) throw err;
		res.send("success");
	});
	db_connect.end();
}

/************* new friends ****************/
exports.new_friends = function(req, res) {
	res.render('new_friends', {});
};

/************* profile ****************/
exports.profile = function(req, res) {
	res.render('profile', {});
};

/************* edit profile ****************/
exports.edit_profile = function(req, res) {
	res.render('edit_profile', {});
};


