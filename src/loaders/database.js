const pgp = require('pg-promise')();
const config = require('@app/config');


const cn = {
	host: config.db_host,
	port: config.db_port,
	database: config.db_name,
	user: config.db_user,
	password : config.db_password    
};

db = null;

try{
	db = pgp(cn);
}catch(e){
	console.log("errore connessione al DB");
	throw(e);
}

module.exports = {
	db:db
};
