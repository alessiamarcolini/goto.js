const path = require('path');
const User = require('../../models/user');
const Meal = require('../../models/meal_model');
const Food = require('../../models/food_model');

/**
 * This middleware has the goal to 'authorize' an user, depending on the existance of its ID.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Next function} next 
 */
async function userAuth(req, res, next){
    await User.authUser(req.body.id_user)
        .then((result) => {
            result.length !== 0 ? next() : permissionDenied(res);
        }).catch((error) => {
            console.log(error);
            res.status(500).send("Internal error");
            res.end();
        });   
}

/**
 * This middleware checks if a food ID exists.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Next function} next 
 */
async function foodAuth(req, res, next){
    await Food.foodExists(req.body.id_food)
        .then((result) => {
            if(result){
                req.id_food = req.body.id_food;
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

/**
 * This middleware checks if a user is authorized to modify a certain meal.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Next function} next 
 */
async function modifyValidMeal(req, res, next){
    await Meal.userAuth(req.body.id_user, req.body.id_meal)
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

/**
 * This middleware checks if a food exists.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Next function} next 
 */
async function foodExists(req, res, next){
    if(req.body.id_food !== undefined){
        await Food.foodExists(req.body.id_food)
            .then((result) => {
                if(result){
                    req.id_food = req.body.id_food;
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

/**
 * This function sends a permission denied message.
 * @param {Response} res 
 */
function ambiguous(res){
    res.status(300).send("Ambiguous name");
    res.end();
}

/**
 * This function sends a permission denied message.
 * @param {Response} res 
 */
function permissionDenied(res){
    res.status(403.3).send("Access forbidden");
    res.end();
}

/**
 * This function sends a 'food does not exist' message.
 * @param {Response} res 
 */

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