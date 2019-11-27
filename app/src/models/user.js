const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database')


async function create(user) {
	try {
		await db.none('INSERT INTO users(name, pass) VALUES($1, $2)', [user.name, user.password]);
	}catch(e) {
		console.log(e)
		throw Error(e)
	}
}





// eslint-disable-next-line no-unused-vars
async function getAll() {
	try {
	    const users = await db.any('SELECT * FROM _user', []);
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
