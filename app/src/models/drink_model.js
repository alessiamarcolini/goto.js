const { db } = require('@app/loaders/database');

const INSERT_NEW_DRINK = 'INSERT INTO user_drink ("id_user", "quantity", "drink_date") VALUES ($1, $2, $3);';
const DELETE_DRINK = 'DELETE FROM user_drink WHERE id_drink = $1'
const EDIT_AMOUNT_DRINK = 'UPDATE user_drink SET quantity = $1 WHERE id_drink = $2';
const EDIT_DATE_DRINK = 'UPDATE user_drink SET drink_date = $1 WHERE id_drink = $2';
const AUTH_USER = 'SELECT * FROM user_drink WHERE id_drink = $1 and id_user = $2'

async function insertDrink(userId, amount, date) {
    return new Promise(async (resolve, reject) => {
        await db.any(INSERT_NEW_DRINK, [userId, amount, date])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

async function deleteDrink(drinkId) {
    return new Promise(async (resolve, reject) => {
        await db.any(DELETE_DRINK, [drinkId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            })
    });
}

async function modifyAmaunt(drinkId, amount) {
    return new Promise(async (resolve, reject) => {
        await db.any(EDIT_AMOUNT_DRINK, [amount, drinkId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

async function modifyDate(drinkId, date) {
    return new Promise(async (resolve, reject) => {
        await db.any(EDIT_DATE_DRINK, [date, drinkId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

async function userAuth(userId, drinkId) {
    return new Promise(async (resolve, reject) => {
        await db.any(AUTH_USER, [drinkId, userId])
            .then((result) => {
                resolve(result.length === 1 ? true : false);
            }).catch((error) => {
                reject(error);
            });
    });
}

module.exports = {
    insertDrink: insertDrink,
    deleteDrink: deleteDrink,
    modifyAmaunt: modifyAmaunt,
    modifyDate: modifyDate,
    userAuth: userAuth
}