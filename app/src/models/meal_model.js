const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database');

const insertNewMeal = 'INSERT INTO user_meal ("id_user", "id_food", "quantity", "meal_date", "type_meal") VALUES ($1, $2, $3, $4, $5);';
const foodCalories = 'SELECT calories_k FROM food_list WHERE id_food = $1';
const deleteQuery = 'DELETE FROM user_meal WHERE id_meal = $1';
const authUser = 'SELECT * FROM user_meal WHERE id_meal = $1 and id_user = $2';
const modifyFoodIdQuery = 'UPDATE user_meal SET id_food = $1 WHERE id_meal = $2';
const modifyQuantityQuery = 'UPDATE user_meal SET quantity = $1 WHERE id_meal = $2';
const modifyDateQuery = 'UPDATE user_meal SET meal_date = $1 WHERE id_meal = $2';
const modifyTypeQuery = 'UPDATE user_meal SET type_meal = $1 WHERE id_meal = $2';



async function insert(userId, foodId, amount, date, type){
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

async function getCalories(foodId, amount){
    return new Promise(async (resolve, reject) => {
        await db.any(foodCalories, [foodId])
            .then((result) => {
                resolve(result[0].calories_k * amount);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

async function deleteMeal(mealId){
    return new Promise(async (resolve, reject) => {
        await db.any(deleteQuery, [mealId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            })
    });
}

async function userAuth(userId, mealId){
    return new Promise(async (resolve, reject) => {
        await db.any(authUser, [mealId, userId])
            .then((result) => {
                resolve(result.length === 1 ? true: false);
            }).catch((error) => {
                reject(error);
            });
    });
}

async function modifyFoodId(mealId, foodId){
    return new Promise(async (resolve, reject) => {
        await db.any(modifyFoodIdQuery, [foodId, mealId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
    });
}

async function modifyQauntity(mealId, amount){
    return new Promise(async (resolve, reject) => {
        await db.any(modifyQuantityQuery, [amount, mealId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
    });
}

async function modifyDate(mealId, date){
    return new Promise(async (resolve, reject) => {
        await db.any(modifyDateQuery, [date, mealId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
    });
}

async function modifyType(mealId, type){
    return new Promise(async (resolve, reject) => {
        await db.any(modifyTypeQuery, [type, mealId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
    });
}

module.exports = {
    insert:insert,
    getCalories:getCalories,
    deleteMeal:deleteMeal,
    userAuth:userAuth,
    modifyFoodId:modifyFoodId,
    modifyQauntity:modifyQauntity,
    modifyDate:modifyDate,
    modifyType:modifyType
}