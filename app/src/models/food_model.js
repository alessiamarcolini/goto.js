const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database');

const foodExist = 'SELECT * FROM food_list WHERE name LIKE $1';

async function foodExists(foodId) {
    return new Promise(async (resolve, reject) => {
        db.any(foodExist, foodId)
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(result);
            });
    });
}

module.exports = {
    foodExists:foodExists
}