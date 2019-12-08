const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database');

const insertNewDrink = 'INSERT INTO user_drink ("id_user", "id_drink", "quantity", "drink_date") VALUES ($1, $2, $3, $4);'; //id_drink 0 = water
const removeDrink = 'DELETE FROM user_drink WHERE id_user_drink = $1';
const editDrinkAmount = 'UPDATE user_drink SET quantity = $1 WHERE id_user_drink = $2';
const editDrinkDate = 'UPDATE user_drink SET drink_date = $1 WHERE id_user_drink = $2';

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
            })
    });
}

async function deleteDrink(id_user_drink){
    return new Promise(async (resolve, reject) => {
        await db.any(removeDrink, [id_user_drink])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            })
    });
}

async function modifyAmaunt(id_user_drink, amount){
    return new Promise(async (resolve, reject) => {
        await db.any(editDrinkAmount, [amount, id_user_drink])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

async function modifyDate(id_user_drink, date){
    return new Promise(async (resolve, reject) => {
        await db.any(editDrinkDate, [date, id_user_drink])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

module.exports = {
    insertDrink:insertDrink,
    deleteDrink:deleteDrink,
    modifyAmaunt:modifyAmaunt,
    modifyDate:modifyDate,
}