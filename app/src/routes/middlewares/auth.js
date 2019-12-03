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
            res.status(500).send("Internal error");
            res.end();
        });
    if(user){
        next();
    }else{
        permissionDenied(res);
    }    
}

async function foodAuth(req, res, next){
    await Food.foodExists(req.body.foodId)
        .then((result) => {
            if(result){
                req.foodId = req.body.foodId;
                next();
            }else{
                foodNotExist(res);
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send("Internal error");
            res.end();
        });
}

async function modifyValidMeal(req, res, next){
    await Meal.userAuth(req.body.userId, req.body.mealId)
        .then((result) => {
            if(result){
                next();
            }else{
                permissionDenied(res);
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send("Internal error");
            res.end();
        });
}

async function foodExists(req, res, next){
    if(req.body.foodId !== undefined){
        await Food.foodExists(req.body.foodId)
            .then((result) => {
                if(result){
                    req.foodId = req.body.foodId;
                    next();
                }else{
                    foodNotExist(res);
                }
            }).catch((error) => {
                console.log(error);
                res.status(500).send("Internal error");
                res.end();
            });
    }else{
        next();
    }
}

function permissionDenied(res){
    res.status(403.3).send("Access forbidden");
    res.end();
}

function foodNotExist(res){
    res.status(404).send("Food doesn't found");
    res.end();
}

module.exports = {
    userAuth: userAuth,
    foodAuth: foodAuth,
    modifyValidMeal:modifyValidMeal,
    foodExists:foodExists
};