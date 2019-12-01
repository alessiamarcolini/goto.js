const pgp = require('pg-promise')();
const {db} = require('@app/loaders/database');

const insertNewMeal = 'INSERT INTO user_meal ("id_user", "id_food", "quantity", "meal_date", "type_meal") VALUES ($1, $2, $3, $4, $5);';
const foodCalories = 'SELECT calories_k FROM food_list WHERE id_food = $1';

async function insertMeal(userId, foodId, amount, req_date, hours){
    let date = mealDate(req_date);
    let type = mealType(hours);

    return new Promise(async (resolve, reject) => {
        await db.any(insertNewMeal, [userId, foodId, amount, date, type])
            .then((result) => {
                resolve(
                    {
                        param1: result,
                        param2: date,
                        param3: type
                    });
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

function mealType(hour){
    let type = undefined;
    if(hour >= 11 && hour <= 14){
        type = 'L';
    }else if(hour >= 5 && hour <= 9){
        type = 'B';
    }else if(hour >= 18 && hour <= 21){
        type = 'D';
    }else{
        type = 'S';
    }  
    return type;
}

function mealDate(date){
    if(!isValidDate(date)){
        let date_ob = new Date();
        return date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2);
    }else{
        return date;
    }
}

function isValidDate(d) {
    var dateReg = /^\d{4}([./-])\d{2}\1\d{2}$/;
    return d.match(dateReg) === null ? false: true;
}

module.exports = {
    insertMeal:insertMeal,
    getCalories:getCalories
}