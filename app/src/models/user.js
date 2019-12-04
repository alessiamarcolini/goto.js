const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database');

const CREATE_USER  = 'INSERT INTO _user(name, birth_date) VALUES($1, $2) RETURNING id_user';
const ALL_USER = 'SELECT * FROM _user;';
const SELECT_USER = 'SELECT * FROM _user WHERE id_user = $1';
const CHANGE_HEIGHT = 'UPDATE _user SET weight = $1 WHERE id_user = $2';
const CHANGE_WEIGHT = 'UPDATE _user SET height = $1 WHERE id_user = $2';
const CHANGE_GENDER = 'UPDATE _user SET gender = $1 WHERE id_user = $2';
const CHANGE_ACTIVITY = 'UPDATE _user SET activity = $1 WHERE id_user = $2';
const CHANGE_NAME = 'UPDATE _user SET name = $1 WHERE id_user = $2';
const CHANGE_SURNAME = 'UPDATE _user SET surname = $1 WHERE id_user = $2';
const GET_USER = 'SELECT * FROM _user WHERE id_user = $1';


/**
 * Models function to execute insert query into the DB.
 * Creates new User.
 * @param {Name} name 
 * @param {Birth Date} birth_date 
*/
async function createUser(user) {
	return new Promise((resolve,reject) => {
		db.none(CREATE_USER, [user.name, user.birth_date])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			})
	})
}

/**
 * Models function to execute select query into the DB.
 * Retrieves all Users on table _user
 * @param {User ID} userId 
 * @param {Food ID} foodId 
 * @param {Quantity} amount 
 * @param {Date} date 
 * @param {Type} type 
*/
async function getAll() {
	return new Promise((resolve, reject) => {
		db.any(ALL_USER)
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

/**
 * Models function to execute select query into the DB.
 * Retrieves single User given :id on table _user
 * @param {ID User} id 
*/
async function getUser(id) {
	return new Promise((resolve,reject) => {
		db.any(SELECT_USER,id)
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

/**
 * Models function to execute update query into the DB.
 * Modifies weight of specific user.
 * @param {ID User} id 
 * @param {Weight} weight
*/
async function changeUserWeight(id,weight) {
	return new Promise((resolve,reject) => {
		db.any(CHANGE_WEIGHT,[weight,id])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

/**
 * This function checks if a user exists.
 * @param {User ID} userId 
 */
async function authUser(userId){
	return new Promise(async (resolve, reject) => {
		await db.any(GET_USER, [userId])
			.then((result) => {
				resolve(result);
			}).catch((error) => {
				reject(error);
			});
	});
}

/**
 * Models function to execute update query into the DB.
 * Modifies height of specific user.
 * @param {ID User} id 
 * @param {Height} Height
*/
async function changeUserHeight(id,height) {
	return new Promise((resolve,reject) => {
		db.any(CHANGE_HEIGHT,[height,id])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

/**
 * Models function to execute update query into the DB.
 * Modifies gender of specific user.
 * @param {ID User} id 
 * @param {Gender} gender
*/
async function changeUserGender(id,gender) {
	return new Promise((resolve,reject) => {
		db.any(CHANGE_GENDER,[gender,id])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

/**
 * Models function to execute update query into the DB.
 * Modifies activity of specific user.
 * @param {ID User} id 
 * @param {Activity Level} activity
*/
async function changeUserActivityLevel(id,level) {
	return new Promise((resolve,reject) => {
		db.any(CHANGE_ACTIVITY,[level,id])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

/**
 * Models function to execute update query into the DB.
 * Modifies name of specific user.
 * @param {ID User} id 
 * @param {Name} name
*/
async function changeUsername(id,name) {
	return new Promise((resolve,reject) => {
		db.any(CHANGE_NAME,[name,id])
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

/**
 * Models function to execute update query into the DB.
 * Modifies surname of specific user.
 * @param {ID User} id 
 * @param {Surname} surname
*/
async function changeUsersurname(id,surname) {
	console.log(surname);
	return new Promise((resolve,reject) => {
		db.any(CHANGE_NAME,[surname,id])
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
  changeUsersurname,
  getAll,
  authUser: authUser
};
