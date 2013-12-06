var mysql_config = require('../sql/mysql_conf').mysql_config;
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');

exports.getprofile = function(req, res){
	console.log("프로필 ip : " + req.ip);
	var evt = new EventEmitter();
	var query = require('../sql/profile');
	var errors = {};
	var result = {idx: req.session.idx}
	query.profile_list(evt, mysql_config, result);
	evt.on('profile_list', function(err, result){
		console.log(result);
		if(typeof(result) == "undefined"){
			errors = {result: "failed", msg:"프로파일 리스트 호출 실패."};
			res.send(errors);
		}
		else{
			res.send(result);
		}
	})
};

exports.geteditprofile = function(req, res){
	console.log("프로필 에디트 ip : " + req.ip);
	var evt = new EventEmitter();
	var query = require('../sql/profile');
	var errors = {};
	var result = {idx: req.session.idx}
	query.edit_profile_list(evt, mysql_config, result);
	evt.on('edit_profile_list', function(err, result){
		console.log(result);
		if(typeof(result) == "undefined"){
			errors = {result: "failed", msg:"프로파일 리스트 호출 실패."};
			res.send(errors);
		}
		else{
			if(req.session.location == undefined)	req.session.location = result[0].location;
			else									result[0].location = req.session.location;
			console.log(result);
			res.send(result);
		}
	})
};

exports.insert_profile = function(req, res){
	console.log("프로필 입력 ip : " + req.ip);
	var evt = new EventEmitter();
	var query = require('../sql/profile');
	var errors = {};
	if(req.body.add_age == "")	var age=null;
	else	var age = parseInt(req.body.add_age);
	var sex = req.body.add_sex;
	var country = req.body.add_country;
	var language = req.body.add_language;
	var pub_level = req.body.add_language_level;
	var want = req.body.add_want;
	var sub_level = req.body.add_want_level;
	var job = req.body.add_job;
	var hobby = req.body.add_hobby;
	var introduce = req.body.add_introduce;
	var location = req.body.location;
	if(sex == "male")	sex = 0;
	else				sex = 1;
	if(pub_level == "none")	pub_level=0;
	else if(pub_level == "poor")	pub_level=1;
	else if(pub_level == "normal")	pub_level=2;
	else if(pub_level == "good")	pub_level=3;
	else if(pub_level == "great")	pub_level=4;
	if(sub_level == "none")	pub_level=0;
	else if(sub_level == "poor")	sub_level=1;
	else if(sub_level == "normal")	sub_level=2;
	else if(sub_level == "good")	sub_level=3;
	else if(sub_level == "great")	sub_level=4;
	var result = {idx: req.session.idx,
				  age: age,
				  sex: sex,
				  country: country,
				  language: language,
				  pub_level: pub_level,
				  want: want,
				  sub_level: sub_level,
				  job: job,
				  location: location,
				  hobby: hobby,
				  introduce: introduce
				}
	query.insert_profile_list(evt, mysql_config, result);
	evt.on('insert_profile_list', function(err, result){
		if(err) throw err;
		console.log("프로필 입력 성공");
		errors = {result: "successed"};
		res.send(errors);
	})
};

exports.upload_profile = function(req, res) {
	fs.readFile(req.files.profilePhotoFile.path, function(error, data) {
		var filePath = __dirname + "/../public/images/profile_thum/useridx_photoidx_" + req.files.profilePhotoFile.name;
		console.log(filePath);
		fs.writeFile(filePath, data, function(error) {
			if(error) {
				throw error;
			} else {
				var result = {result: "success"};
				res.send(result);
			}
		});
	});
}