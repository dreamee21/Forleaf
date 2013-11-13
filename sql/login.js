exports.login = function(evt, mysql_config, result){
	var query = "SELECT idx, ";
	query += "email, ";
	query += "passwd, ";
	query += "name, ";
	query += "PASSWORD('"+result['passwd']+"') AS input_pw ";
	query += "FROM forleaf_user ";
	query += "WHERE email = '" + result['email'] + "'";
	query += " AND passwd = PASSWORD('" + result['passwd'] + "');";
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('login', err, result);
	})
	return query;
}

exports.check_email = function(evt, mysql_config, result){
	var query = "SELECT COUNT(*) AS cnt "
	query += "FROM forleaf_user ";
	query += "WHERE email = '" + result['email'] + "';";

	var sql = mysql_config.query(query, function(err, result){
		evt.emit('check_email', err, result);
	})
	return query;
}

exports.check_idx = function(evt, mysql_config, result){
	var query = "SELECT idx "
	query += "FROM forleaf_user ";
	query += "WHERE email = '" + result['email'] + "';";

	var sql = mysql_config.query(query, function(err, result){
		evt.emit('check_email', err, result);
	})
	return query;
}

exports.signup = function(evt, mysql_config, result){
	var query = "INSERT INTO forleaf_user SET ";
	query += "email = '" + result['email'] + "', ";
	query += "passwd = PASSWORD('" + result['passwd'] + "'), ";
	query += "name = '" + result['name'] + "';";
	console.log(query);

	var sql = mysql_config.query(query, function(err, result){
		evt.emit('signup', err, result);
	})
	return query;
}