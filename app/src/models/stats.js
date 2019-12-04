const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database');


const getWeightsQuery = `
	SELECT weight, change_date
	FROM  user_history
	WHERE id_user = $1
	ORDER BY change_date;
`;


async function getWeights(user) {
	return(db.any(getWeightsQuery, [user]));  //pg-promise torna delle funzioni che sono già promises
}


module.exports = {
  getWeights
};
