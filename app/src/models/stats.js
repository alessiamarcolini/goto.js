const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database')

const getMealsQuery = 'SELECT * FROM _user';





async function getMeals(user) {
	return(db.any(getMealsQuery))  //pg-promise torna delle funzioni che sono già promises
}





module.exports = {
  getMeals
};
