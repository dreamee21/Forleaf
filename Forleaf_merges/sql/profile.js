exports.profile_list = function(evt, mysql_config, result){
	var query = "SELECT A.idx, A.name, A.pub_language, A.sub_language, A.country, A.birth, A.hobby, A.job, A.goal, ";
	query += "A.pub_level, A.sub_level, A.age, A.sex, A.location, A.profile_imagename, A.love, A.company, A.introduce ";
	query += "FROM forleaf_user AS A ";
	query += "WHERE A.idx=" + result['idx'] +";";
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('profile_list', err, result);
	})
	return query;
}

exports.edit_profile_list = function(evt, mysql_config, result){
	var query = "SELECT A.idx, A.name, A.pub_language, A.sub_language, A.country, A.birth, A.hobby, A.job, A.goal, ";
	query += "A.pub_level, A.sub_level, A.age, A.sex, A.location, A.profile_imagename, A.love, A.company, A.introduce ";
	query += "FROM forleaf_user AS A ";
	query += "WHERE A.idx=" + result['idx'] +";";
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('edit_profile_list', err, result);
	})
	return query;
}

exports.insert_profile_list = function(evt, mysql_config, result){
	var query = "UPDATE forleaf_user AS A SET ";
	query += "A.pub_language = '" + result['language'];
	query += "', A.sub_language = '" + result['want'];
	query += "', A.country = '" + result['country'];
	query += "', A.hobby = '" + result['hobby'];
	query += "', A.job = '" + result['job'];
	query += "', A.pub_level = '" + result['pub_level'];
	query += "', A.sub_level = '" + result['sub_level'];
	query += "', A.age = " + result['age'];
	query += ", A.sex = " + result['sex'];
	query += ", A.location = '" + result['location'];
	query += "', A.introduce = '" + result['introduce'];
	//query += "', A.location = '" + result['location'];
	//query += "', A.profile_imagename = '" + result['profile_imagename'];
	//query += "', A.love = '" + result['love'];
	//query += "', A.company = '" + result['company'];
	query += "' WHERE A.idx=" + result['idx'] +";";
	console.log(query);
	var sql = mysql_config.query(query, function(err, result){
		evt.emit('insert_profile_list', err, result);
	})
	return query;
}