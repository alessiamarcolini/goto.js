const path = require('path');
const User = require('../../models/user');
const Meal = require('../../models/meal_model');
const Food = require('../../models/food_model');

async function userAuth(req, res, next){
    let user = false;
    await User.authUser(req.body.userId)
        .then((result) => {
            user = result.length !== 0;
        }).catch((error) => {
            console.log(error);
        });
    if(user){
        next();
    }else{
        permissionDenied(res);
    }    
}

async function food(req, res, next){
    await Food.foodExists(req.body.foodId)
        .then((result) => {
            switch(result.length){
                case 0:
                    foodNotExist(res);
                    break;
                case 1:
                    req.foodId = result[0].id_food;
                    next();
                    break;
                default:
                    ambiguous(res);
            }
        }).catch((error) => {
            console.log(error);
        });
}

function permissionDenied(res){
    res.status(403.3).send("Access forbidden");
    res.end();
}

function foodNotExist(res){
    res.status(404).send("Food doesn't found");
    res.end();
}

function ambiguous(res){
    res.status(300).send("Ambiguous name");
    res.end();
}

module.exports = {
    userAuth: userAuth,
    food: food
};