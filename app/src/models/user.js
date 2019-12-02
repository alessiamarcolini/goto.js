const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database')

async function createUser(user) {
	return new Promise((resolve,reject) => {
		db.none('INSERT INTO users(name, birth_date) VALUES($1, $2)', [user.name, user.birth_date])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			})
	})
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

async function changeUserWeight(id,weight) {
	return new Promise((resolve,reject) => {
		db.any('UPDATE _user SET weight = $1 WHERE id_user = $2',[weight,id])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

async function changeUserHeight(id,height) {
	return new Promise((resolve,reject) => {
		db.any('UPDATE _user SET height = $1 WHERE id_user = $2',[height,id])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

async function changeUserGender(id,gender) {
	return new Promise((resolve,reject) => {
		db.any('UPDATE _user SET gender = $1 WHERE id_user = $2',[gender,id])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

async function changeUserActivityLevel(id,level) {
	return new Promise((resolve,reject) => {
		db.any('UPDATE _user SET activity = $1 WHERE id_user = $2',[level,id])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}


module.exports = {
  createUser,
  getAll,
  getUser,
  changeUserWeight,
  changeUserHeight,
  changeUserGender,
  changeUserActivityLevel
};
