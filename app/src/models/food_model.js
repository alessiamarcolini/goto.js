const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database');

const foodExist = 'SELECT * FROM food_list WHERE id_food = $1';

async function foodExists(foodId) {
    return new Promise(async (resolve, reject) => {
        db.any(foodExist, [foodId])
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