const pgp = require('pg-promise')();
const config = require('@app/config');


const cn = {
	host: config.db_host,
	port: config.db_port,
	database: config.db_name,
	user: config.db_user,
	password : config.db_password    
};

const db = pgp(cn);






async function create(user) {
	try {
		await db.none('INSERT INTO users(name, password) VALUES($1, $2)', [user.name, user.password]);
	}catch(e) {
		console.log(e)
		throw Error(e)
	}
}





// eslint-disable-next-line no-unused-vars
async function getAll() {
	try {
	    const users = await db.any('SELECT * FROM users', []);
	    return users;
	} 
	catch(e) {
		throw Error(e)
	}
}

module.exports = {
  create,
  getAll
};
