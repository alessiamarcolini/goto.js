const meal = require('../models/meal_model');

async function insert(userId, foodId, amount, req_date, hours){
    return new Promise(async (resolve, reject) => {
        if(amount > 0){
            let date = mealDate(req_date);
            let type = mealType(hours);
            if(type !== "Error"){
                await meal.insert(userId, foodId, amount, date, type)
                    .then(async () => {
                        switch(type) {
                            case "L":
                                type = "Lunch";
                                break;
                            case "B":
                                type = "Breakfast";
                                break;
                            case "D":
                                type = "Dinner";
                                break;
                            default:
                                type = "Snack";
                                break;
                        }
                        await getCalories(foodId, amount)
                            .then((result) => {
                                const RESPONS = {
                                    status: "Insertion completed! ;)",
                                    "date": date,
                                    "type": type,
                                    food_added: foodId,
                                    "amount": parseInt(amount), 
                                    calories: result/amount,
                                    total_calories_added: result
                                };
                                resolve(RESPONS);
                            }).catch((error) => {
                                reject(error);
                            });
                    }).catch((error) => {
                        reject(error);
                    });
            }else{
                resolve("Please insert a valid hour");
            }            
        }else{
            resolve("Please insert a valid quantity");
        }
    });
}

async function getCalories(foodId, amount){
    return new Promise(async (resolve, reject) => {
        await meal.getCalories(foodId, amount)
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
    });
}

async function deleteMeal(mealId){
    return new Promise(async (resolve, reject) => {
        await meal.deleteMeal(mealId)
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            })
    });
}

async function modify(mealId, foodId, amount, date, type){
    return new Promise(async (resolve, reject) => {
        let response = {};
        if(foodId !== undefined){
            await meal.modifyFoodId(mealId, foodId)
                .then(() => {
                    response.FoodId = 'Modified';
                }).catch((error) => {
                    reject(error);
                });
        }
        if(amount !== undefined){
            await meal.modifyQauntity(mealId, amount)
                .then(() => {
                    response.Quantity =  'Modified';
                }).catch((error) => {
                    reject(error);
                });
        }
        if(date !== undefined){
            if(isValidDate(date.toString())){
                await meal.modifyDate(mealId, date)
                    .then(() => {
                        response.Date = 'Modified';
                    }).catch((error) => {
                        reject(error);
                    });
            }            
        }
        if(type !== undefined){
            type = mealType(type);
            if(type !== "Error"){
                await meal.modifyType(mealId, type)
                    .then(() => {
                        response.Type = 'Modified';
                    }).catch((error) => {
                        reject(error);
                    });
            }else{
                response.Type = 'Not Modified, hour not valid';
            }            
        }
        resolve(response);
    });
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

function mealType(hour){
    let type = undefined;
    if(hour >= 11 && hour <= 14){
        type = 'L';
    }else if(hour >= 5 && hour <= 9){
        type = 'B';
    }else if(hour >= 18 && hour <= 21){
        type = 'D';
    }else if(hour >= 0 && hour <= 24){
        type = 'S';
    }else{
        type = 'Error';
    }
    return type;
}

module.exports = {
    insert:insert,
    getCalories:getCalories,
    deleteMeal:deleteMeal,
    modify:modify
}