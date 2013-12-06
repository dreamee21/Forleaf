var mysql = require('mysql');
var mysql_config = mysql.createConnection({
	host				: 'localhost',
	user				: 'root',
	password			: 'anm30925',
	database			: 'forleaf',
	multipleStatements	: true
});

module.exports = {
	mysql_config 		: mysql_config 
}