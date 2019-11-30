const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database');

const getUser = 'SELECT * FROM _user WHERE id_user = $1';

async function create(user) {
	try {
		await db.none('INSERT INTO users(name, pass) VALUES($1, $2)', [user.name, user.password]);
	}catch(e) {
		console.log(e)
		throw Error(e)
	}
}


async function authUser(userId){
	return new Promise(async (resolve, reject) => {
		await db.any(getUser, [userId])
			.then((result) => {
				resolve(result);
			}).catch((error) => {
				reject(error);
			});
	});
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
  getAll,
  authUser: authUser
};
