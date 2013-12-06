exports.recommend_list = function(evt, mysql_config, result){
	var query = "SELECT A.idx, A.name, A.pub_language, A.sub_language, A.country, ";
	query += "A.pub_level, A.sub_level, A.age, A.sex, A.location, A.profile_imagename ";
	query += "FROM forleaf_user AS A ";
	query += "WHERE A.idx NOT IN ";
	query += "(SELECT B.friend_idx FROM forleaf_friend AS B ";
	query += "WHERE B.user_idx = " + result['idx'] + ")";
	query += " AND A.idx NOT IN ";
	query += "(SELECT E.user_idx FROM forleaf_friend AS E ";
	query += "WHERE E.friend_idx = " + result['idx'] + ")";
	query += " AND A.idx NOT IN ";
	query += "(SELECT C.friend_idx FROM forleaf_request AS C ";
	query += "WHERE C.user_idx = " + result['idx'] + ")";
	query += " AND A.idx NOT IN ";
	query += "(SELECT D.user_idx FROM forleaf_request AS D ";
	query += "WHERE D.friend_idx = " + result['idx'] + ");";
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('recommend_list', err, result);
	})
	return query;
}

exports.request_list = function(evt, mysql_config, result){
	var query = "SELECT A.idx, A.name, A.pub_language, A.sub_language, A.country, ";
	query += "A.pub_level, A.sub_level, A.age, A.sex, A.location, A.profile_imagename ";
	query += "FROM forleaf_user AS A ";
	query += "WHERE A.idx != " + result['idx'] + " AND A.idx IN ";
	query += "(SELECT B.user_idx FROM forleaf_request AS B ";
	query += "WHERE B.friend_idx = " + result['idx'] + " AND B.agreement=0);";
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('request_list', err, result);
	})
	return query;
}

exports.friend_profile_list = function(evt, mysql_config, result){
	var query = "SELECT A.idx, A.name, A.pub_language, A.sub_language, A.country, A.birth, A.hobby, A.job, A.goal, ";
	query += "A.pub_level, A.sub_level, A.age, A.sex, A.location, A.profile_imagename, A.love, A.company, A.introduce ";
	query += "FROM forleaf_user AS A ";
	query += "WHERE A.idx=" + result['idx'] +";";
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('friend_profile_list', err, result);
	})
	return query;
}

exports.set_friend = function(evt, mysql_config, result){
	var query = "INSERT INTO forleaf_friend SET " ;
	query += "user_idx = " + result['idx'];
	query += ", friend_idx = " + result['friend_idx'] + ";";
	query += "UPDATE forleaf_request AS A SET ";
	query += "A.agreement=1 WHERE A.friend_idx = " + result['idx'] + " AND A.user_idx = " + result['friend_idx'] + ";";
	console.log(query);
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('set_friend', err, result);
	})
	return query;
}

exports.request_friend = function(evt, mysql_config, result){
	var query = "INSERT INTO forleaf_request SET " ;
	query += "user_idx = " + result['idx'];
	query += ", friend_idx = " + result['friend_idx'] + ";";
	console.log(query);
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('request_friend', err, result);
	})
	return query;
}

exports.check_request = function(evt, mysql_config, result){
	var query = "SELECT COUNT(*) AS cnt "
	query += "FROM forleaf_request ";
	query += "WHERE friend_idx = " + result['idx'] + " AND user_idx = " + result['friend_idx'] + ";";
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('check_request', err, result);
	})
	return query;
}