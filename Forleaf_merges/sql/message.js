exports.message_list = function(evt, mysql_config, result){
	var query = "SELECT A.idx, A.name, A.pub_language, A.sub_language, A.country, ";
	query += "A.pub_level, A.sub_level, A.age, A.sex, A.location, A.profile_imagename ";
	query += "FROM forleaf_user AS A ";
	query += "WHERE A.idx IN ";
	query += "(SELECT B.friend_idx FROM forleaf_friend AS B ";
	query += "WHERE B.user_idx = " + result['idx'] + ")";
	query += " OR A.idx IN (SELECT C.user_idx FROM forleaf_friend AS C ";
	query += "WHERE C.friend_idx = " + result['idx'] + ");";
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('message_list', err, result);
	})
	return query;
}

exports.message_profile = function(evt, mysql_config, result){
	var query = "SELECT A.idx, A.name, A.pub_language, A.sub_language, A.country, ";
	query += "A.pub_level, A.sub_level, A.profile_imagename ";
	query += "FROM forleaf_user AS A ";
	query += "WHERE A.idx = " + result['friend_idx'] + ";";
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('message_profile', err, result);
	})
	return query;
}

exports.letter_list = function(evt, mysql_config, result){
	var query = "SELECT A.user_idx, A.friend_idx, A.reg_date, A.message, A.message_idx ";
	query += "FROM forleaf_message AS A ";
	query += "WHERE (A.user_idx = " + result['friend_idx'] + " AND A.friend_idx = " + result['idx'] + ")"
	query += " OR (A.friend_idx = " + result['friend_idx'] + " AND A.user_idx = " + result['idx'] + ") order by reg_date;";
	query += "SELECT A.profile_imagename, A.name FROM forleaf_user AS A WHERE A.idx = " + result['friend_idx'] + ";";
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('letter_list', err, result);
	})
	return query;
}

exports.inputletter = function(evt, mysql_config, result){
	var query = "INSERT INTO forleaf_message SET ";
	query += "user_idx = " + result['idx'];
	query += ", friend_idx = " + result['friend_idx'];
	query += ", message = '" + result['msg'];
	query += "', message_idx='" + result['message_idx'] + "';";
	console.log(query);
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('inputletter', err, result);
	})
	return query;
}

