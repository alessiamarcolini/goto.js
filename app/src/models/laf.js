const {db} = require('@app/loaders/database')

const GET_LAF_FACTOR = 'SELECT * from laf WHERE gender LIKE $1 AND age_type LIKE $2 AND level LIKE $3';

/**
 * Models function to execute select query into the DB. 
 * Retrieves the LAF factor given :gender, :ageType, :activityLevel on table _laf
 * @param {Gender} gender
 * @param {Age Type} ageType
 * @param {Activily Level} activityLevel
*/
async function getLafFactor(gender, ageType, activityLevel) {
	return new Promise((resolve,reject) => {
		db.any(GET_LAF_FACTOR, [gender, ageType, activityLevel])
			.then((result) => {
				console.log(result[0].factor);
				resolve(result[0].factor);
			})
			.catch((error) => {
				//console.log(error);
				reject(error);
			});
	});
}


module.exports = {
    getLafFactor

  };
  