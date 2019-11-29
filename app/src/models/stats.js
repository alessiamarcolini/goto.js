const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database')


/*
possible changes ==> 
	quantity->quantity_ml
	quantity->quantity_g
	
*/


const getWeightsQuery = `
	SELECT weight, change_date
	FROM  user_history
	WHERE id_user = $1;
`;

const getInfoQuery = `
	SELECT weight, height, factor, U.gender, birth_date 
	FROM _user as U 
	JOIN laf as L ON (L.level=U.activity AND L.gender = U.gender) 
	WHERE U.id_user = $1;
`;

const getTodayMealsQuery = `
	SELECT quantity, calories_k 
	FROM user_meal as M
	JOIN food_list as F ON (M.id_food=F.id_food) 
	WHERE id_user=$1 AND meal_date=$2;
`;

const getTodayWaterQuery = `
	SELECT quantity
	FROM user_drink
	WHERE id_user=$1 AND drink_date=$2;
`;





async function getWeights(user) {
	return(db.any(getWeightsQuery, [user]));  //pg-promise torna delle funzioni che sono già promises
}

async function getInfo(user) {
	return(db.any(getInfoQuery, [user]));
}

async function getTodayMeals(user){
	return(db.any(getTodayMealsQuery, [user, new Date()]));
}
async function getTodayWater(user){
	return(db.any(getTodayWaterQuery, [user, new Date()]));
}


module.exports = {
  getWeights,
  getInfo,
  getTodayMeals,
  getTodayWater
};
