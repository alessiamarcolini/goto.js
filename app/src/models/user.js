const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database')

// Models function to execute insert query into the DB.
// Creates new User.
async function createUser(user) {
	return new Promise((resolve,reject) => {
		db.none('INSERT INTO _user(name, birth_date) VALUES($1, $2)', [user.name, user.birth_date])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			})
	})
}

// Models function to execute select query into the DB.
// Retrieves all Users on table _user
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

// Models function to execute select query into the DB.
// Retrieves single User given :id on table _user
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

// Models function to execute update query into the DB.
// Modifies weight of specific user given :id and :weight value
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

// Models function to execute update query into the DB.
// Modifies height of specific user given :id and :height value
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

// Models function to execute update query into the DB.
// Modifies gender of specific user given :id and :gender value
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

// Models function to execute update query into the DB.
// Modifies activity level of specific user given :id and :activity value
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

// Models function to execute update query into the DB.
// Modifies name of specific user given :id and :name value
async function changeUsername(id,name) {
	return new Promise((resolve,reject) => {
		db.any('UPDATE _user SET name = $1 WHERE id_user = $2',[name,id])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

// Models function to execute update query into the DB.
// Modifies surname of specific user given :id and :surname value
async function changeUsersurname(id,surname) {
	console.log(surname);
	return new Promise((resolve,reject) => {
		db.any('UPDATE _user SET surname = $1 WHERE id_user = $2',[surname,id])
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
  changeUserActivityLevel,
  changeUsername,
  changeUsersurname
};
