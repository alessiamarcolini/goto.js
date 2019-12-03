const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database');

const insertNewDrink = 'INSERT INTO user_drink ("id_user", "id_drink", "quantity", "drink_date") VALUES ($1, $2, $3, $4);'; //id_drink 0 = water

let date_ob = new Date();
let date = date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2);
let hours = date_ob.getHours

async function insertDrink(userId, drinkId, amount){
    return new Promise(async (resolve, reject) => {
        await db.any(insertNewDrink, [userId, drinkId, amount, date])
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

module.exports = {
    insertDrink:insertDrink
}