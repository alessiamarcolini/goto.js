const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database')


async function create(user) {
	try {
		await db.none('INSERT INTO users(name, gender, birth_date) VALUES($1, $2, $3)', [user.name, user.gender,user.birth_date]);
	}catch(e) {
		console.log(e)
		throw Error(e)
	}
}

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
}

async function getUser(id) {
	return new Promise((resolve,reject) => {
		db.any('SELECT * FROM _user WHERE id_user = $1',id)
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

module.exports = {
  create,
  getAll,
  getUser
};
