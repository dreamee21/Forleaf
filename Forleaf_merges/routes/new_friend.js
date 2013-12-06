var mysql_config = require('../sql/mysql_conf').mysql_config;
var util = require('util');
var EventEmitter = require('events').EventEmitter;

exports.getrequest = function(req, res){
	console.log("친구 요청 ip : " + req.ip);
	var evt = new EventEmitter();
	var query = require('../sql/new_friend');
	var errors = {};
	var result = {idx: req.session.idx, page: req.body.page}
	query.request_list(evt, mysql_config, result);
	evt.on('request_list', function(err, result){
		if(typeof(result) == "undefined"){
			errors = {result: "failed", msg:"친구 요청 리스트 호출 실패."};
			res.send(errors);
		}
		else{
			console.log(result);
			res.send(result);
		}
	})
};

exports.getrecommend = function(req, res){
	console.log("친구 추천 ip : " + req.ip);
	var evt = new EventEmitter();
	var query = require('../sql/new_friend');
	var errors = {};
	var result = {idx: req.session.idx, page: req.body.page}
	query.recommend_list(evt, mysql_config, result);
	evt.on('recommend_list', function(err, result){
		if(typeof(result) == "undefined"){
			errors = {result: "failed", msg:"친구 추천 리스트 호출 실패."};
			res.send(errors);
		}
		else{
			result[0].session_idx = req.session.idx;
			console.log(result);
			res.send(result);
		}
	})
};

exports.getfriendprofile = function(req, res){
	console.log(req.session);
	console.log("친구 요청 프로필 ip : " + req.ip);
	var evt = new EventEmitter();
	var query = require('../sql/new_friend');
	var errors = {};
	var result = {idx: req.session.friend_idx}
	query.friend_profile_list(evt, mysql_config, result);
	evt.on('friend_profile_list', function(err, result){
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

exports.set_friend = function(req, res){
	console.log("친구 요청 수락 ip : " + req.ip);
	var evt = new EventEmitter();
	var evt2 = new EventEmitter();
	var query = require('../sql/new_friend');
	var errors = {};
	var result = {idx: req.session.idx,
				  friend_idx: req.session.friend_idx}
	query.check_request(evt, mysql_config, result);
	evt.on('check_request', function(err, result){
		if(result[0].cnt == 0){
			var param = {idx: req.session.idx,
				  friend_idx: req.session.friend_idx}
			query.request_friend(evt2, mysql_config, param);
			evt2.on('request_friend', function(err, results){
				if(err) throw err;
				console.log("친구 요청 완료");
				errors = {result: "successed"};
				res.send(errors);
			})
		}
		else{
			var param = {idx: req.session.idx,
				  friend_idx: req.session.friend_idx}
			query.set_friend(evt2, mysql_config, param);
			evt2.on('set_friend', function(err, results){
				if(err) throw err;
				console.log("친구 수락 완료");
				errors = {result: "successed"};
				res.send(errors);
			})
		}
	})
};