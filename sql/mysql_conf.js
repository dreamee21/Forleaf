var mysql = require('mysql');
var mysql_config = mysql.createConnection({
	host				: '61.43.139.64',
	user				: 'root',
	password			: 'software',
	database			: 'Forleaf',
	multipleStatements	: true
});

module.exports = {
	mysql_config 		: mysql_config 
}
