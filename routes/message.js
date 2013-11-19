var mysql_config = require('../sql/mysql_conf').mysql_config;
var util = require('util');
var EventEmitter = require('events').EventEmitter;

exports.getmessage = function(req, res){
	console.log("메시지 ip : " + req.ip);
	var evt = new EventEmitter();
	var query = require('../sql/message');
	var errors = {};
	var result = {idx: req.session.idx}
	query.message_list(evt, mysql_config, result);
	evt.on('message_list', function(err, result){
		console.log(result);
		if(typeof(result) == "undefined"){
			errors = {result: "failed", msg:"메시지 리스트 호출 실패."};
			res.send(errors);
		}
		else{
			res.send(result);
		}
	})
};

exports.getfriendprofile = function(req, res){
	console.log("메시지 ip : " + req.ip);
	var evt = new EventEmitter();
	var query = require('../sql/message');
	var errors = {};
	var result = {friend_idx: req.session.friend_idx}
	query.message_profile(evt, mysql_config, result);
	evt.on('message_profile', function(err, result){
		console.log(result);
		if(typeof(result) == "undefined"){
			errors = {result: "failed", msg:"메시지 프로필 호출 실패."};
			res.send(errors);
		}
		else{
			res.send(result);
		}
	})
};

exports.getletter = function(req, res){
	console.log("채팅 ip : " + req.ip);
	var evt = new EventEmitter();
	var query = require('../sql/message');
	var errors = {};
	var result = {idx: req.session.idx, friend_idx: req.session.friend_idx}
	query.letter_list(evt, mysql_config, result);
	evt.on('letter_list', function(err, result){
		console.log(result);
		if(typeof(result) == "undefined"){
			errors = {result: "failed", msg:"채팅 리스트 호출 실패."};
			res.send(errors);
		}
		else{
			result[1][0].idx = req.session.idx;
			result[1][0].friend_idx = req.session.friend_idx;
			result[1][0].message_idx = req.session.message_idx;
			console.log("AAA : " + result[1][0].idx + "=== BBBB");
			res.send(result);
		}
	})
};

exports.inputletter = function(req, res){
	console.log("채팅 메시지 ip : " + req.ip);
	var evt = new EventEmitter();
	var query = require('../sql/message');
	var errors = {};
	var result = {idx: req.session.idx, friend_idx: req.session.friend_idx, message_idx: req.session.message_idx, msg: req.body.msg}
	query.inputletter(evt, mysql_config, result);
	evt.on('inputletter', function(err, result){
		console.log(result);
		if(typeof(result) == "undefined"){
			errors = {result: "failed", msg:"채팅 리스트 호출 실패."};
			res.send(errors);
		}
		else{
			res.send(result);
		}
	})
};
/*exports.message_profile = function(req, res){
	console.log("메시지 프로필 ip : " + req.ip);
	var evt = new EventEmitter();
	var query = require('../sql/message');
	var errors = {};
	var result = {idx: req.session.idx, friend_idx: req.body.friend_idx}
	query.message_profile(evt, mysql_config, result);
	evt.on('message_profile', function(err, result){
		console.log(result);
		if(typeof(result) == "undefined"){
			errors = {result: "failed", msg:"메시지 리스트 호출 실패."};
			res.send(errors);
		}
		else{
			res.send(result);
		}
	})
}*/

/*exports.getfriend_idx = function(req, res){
	console.log("친구 idx : " + req.body.friend_idx);
	req.session.friend_idx = req.body.friend_idx;
};*/