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
	return new Promise((resolve, reject) => {
		db.any('SELECT * FROM _user;')
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
	/**
	try {
	    const users = await db.any('SELECT * FROM users', []);
	    return users;
	} 
	catch(e) {
		throw Error(e)
	}
	 */
}

async function ciao(){
	await getAll()
		.then((result) => {

		})
		.catch((error) => {
			
		})
}


module.exports = {
  create,
  getAll
};
