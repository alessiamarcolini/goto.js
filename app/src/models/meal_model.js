const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database');

const insertNewMeal = 'INSERT INTO user_meal ("id_user", "id_food", "quantity", "meal_date", "type_meal") VALUES ($1, $2, $3, $4, $5);';

let date_ob = new Date();
let date = date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2);
let hours = date_ob.getHours;

let type = undefined;

if(hours >= 11 && hours <= 14){
    type = 'L';
}else if(hours >= 5 && hours <= 9){
    type = 'B';
}else if(hours >= 18 && hours <= 21){
    type = 'D';
}else{
    type = 'S';
}

async function insertMeal(userId, foodId, amount){
    return new Promise(async (resolve, reject) => {
        await db.any(insertNewMeal, [userId, foodId, amount, date, type])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

module.exports = {
    insertMeal:insertMeal
}