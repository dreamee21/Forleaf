exports.recommend_list = function(evt, mysql_config, result){
	var query = "SELECT idx, name, pub_language, sub_language, ";
	query += "pub_level, sub_level, location, age, sex ";
	query += "FROM forleaf_user A ";
	query += "LEFT JOIN forleaf_friend B ";
	query += "ON A.idx = B.friend_idx ";
	query += "WHERE B.friend_idx IS NULL AND B.friend_idx = " + result['idx'];
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('recommend', err, result);
	})
	return query;
}

exports.request_list = function(evt, mysql_config, result){
	var query = "SELECT idx, ";
	query += "email, ";
	query += "passwd, ";
	query += "name, ";
	query += "PASSWORD('"+result['passwd']+"') AS input_pw ";
	query += "FROM forleaf_user ";
	query += "WHERE email = '" + result['email'] + "'";
	query += " AND passwd = PASSWORD('" + result['passwd'] + "');";
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('request', err, result);
	})
	return query;
}
