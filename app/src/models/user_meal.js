const {db} = require('@app/loaders/database');

const GET_REMAINING_CALORIES_BY_USER_AND_DATE = 'SELECT sum(calories_k*quantity) FROM user_meal INNER JOIN food_list ON user_meal.id_food = food_list.id_food WHERE id_user=$1 AND meal_date=$2 GROUP BY meal_date';

/**
 * Models function to execute select query into the DB. 
 * Retrieves the remaining calories that a user should take, given :id_user and :date, on table user_meal
 * @param {ID user} id_user
 * @param {Date} date
*/
async function getRemainingCalories(id_user, date) {
	return new Promise((resolve,reject) => {
		db.any(GET_REMAINING_CALORIES_BY_USER_AND_DATE, [id_user, date,])
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
    getRemainingCalories

  };
  