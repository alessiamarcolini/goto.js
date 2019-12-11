const {db} = require('@app/loaders/database');

/**
 * Queries:
 */
const INSERT_NEW_MEAL = 'INSERT INTO user_meal ("id_user", "id_food", "quantity", "meal_date", "type_meal") VALUES ($1, $2, $3, $4, $5);';
const FOOD_CALORIES = 'SELECT calories_k FROM food_list WHERE id_food = $1';
const DELETE_QUERY = 'DELETE FROM user_meal WHERE id_meal = $1';
const AUTH_USER = 'SELECT * FROM user_meal WHERE id_meal = $1 and id_user = $2';
const MODIFY_FOOD_QUERY = 'UPDATE user_meal SET id_food = $1 WHERE id_meal = $2';
const MODIFY_QUANTITY_QUERY = 'UPDATE user_meal SET quantity = $1 WHERE id_meal = $2';
const MODIFY_DATE_QUERY = 'UPDATE user_meal SET meal_date = $1 WHERE id_meal = $2';
const MODIFY_TYPE_QUERY = 'UPDATE user_meal SET type_meal = $1 WHERE id_meal = $2';


/**
 * This function inserts the given values into the database.
 * @param {User ID} userId 
 * @param {Food ID} foodId 
 * @param {Quantity} amount 
 * @param {Date} date 
 * @param {Type} type 
 */
async function insert(userId, foodId, amount, date, type){
    return new Promise(async (resolve, reject) => {
        await db.any(INSERT_NEW_MEAL, [userId, foodId, amount, date, type])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

/**
 * This function retrieves the calories of a certain food from the database.
 * @param {Food ID} foodId 
 */
async function getCalories(foodId){
    return new Promise(async (resolve, reject) => {
        await db.any(FOOD_CALORIES, [foodId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

/**
 * This function deletes a meal from the db.
 * @param {Meal ID} mealId 
 */
async function deleteMeal(mealId){
    return new Promise(async (resolve, reject) => {
        await db.any(DELETE_QUERY, [mealId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            })
    });
}

/**
 * This function retrieves if a user is authorized or not.
 * @param {User ID} userId 
 * @param {Meal ID} mealId 
 */
async function userAuth(userId, mealId){
    return new Promise(async (resolve, reject) => {
        await db.any(AUTH_USER, [mealId, userId])
            .then((result) => {
                resolve(result.length === 1 ? true: false);
            }).catch((error) => {
                reject(error);
            });
    });
}

/**
 * This function modifies the food ID of the meal.
 * @param {Meal ID} mealId 
 * @param {Food id} foodId 
 */
async function modifyFoodId(mealId, foodId){
    return new Promise(async (resolve, reject) => {
        await db.any(MODIFY_FOOD_QUERY, [foodId, mealId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
    });
}

/**
 * This function modifies the quantity for a determinate meal.
 * @param {Meal ID} mealId 
 * @param {Quantity to modify} amount 
 */
async function modifyQauntity(mealId, amount){
    return new Promise(async (resolve, reject) => {
        await db.any(MODIFY_QUANTITY_QUERY, [amount, mealId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
    });
}

/**
 * This function modifies the date of a meal.
 * @param {Meal ID} mealId 
 * @param {Date ID} date 
 */
async function modifyDate(mealId, date){
    return new Promise(async (resolve, reject) => {
        await db.any(MODIFY_DATE_QUERY, [date, mealId])
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
    });
}

/**
 * This function modifies the type of the meal.
 * @param {Meal ID} mealId 
 * @param {Type} type 
 */
async function modifyType(mealId, type){
    return new Promise(async (resolve, reject) => {
        await db.any(MODIFY_TYPE_QUERY, [type, mealId])
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