const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database');

const FOOD_EXISTS = 'SELECT * FROM food_list WHERE id_food = $1';

/**
 * This functions checks if a certain food exists.
 * @param {Food ID} foodId 
 */
async function foodExists(foodId) {
    return new Promise(async (resolve, reject) => {
        db.any(FOOD_EXISTS, [foodId])
            .then((result) => {
                resolve(result.length === 1? true: false);
            }).catch((error) => {
                reject(error);
            });
    });
}

module.exports = {
    foodExists:foodExists
}