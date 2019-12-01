const { Router } = require('express');
const auth = require('./middlewares/auth');
const meal = require('../models/meal_model');
const route = Router();

//Router.use(auth.userAuth(req,res,next));
//Router.use(auth.mealAuth(req,res,next));

module.exports = async function(routes) {

    routes.use('/meal', route);

    route.use('/:userId/:mealId/', auth.userAuth, auth.food);

    route.get('/:userId/:mealId/:amount/:date/:hours', async (req, res)=>{
        const amount = req.params.amount;
        await meal.insertMeal(req.params.userId, req.foodId, amount, req.params.date.toString(), req.params.hours)
            .then(async (result) => {
                let date = result.param2;
                let type = result.param3;
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
                await meal.getCalories(req.foodId, amount)
                    .then((result) => {
                        const respons = {
                            status: "Insertion completed! ;)",
                            "date": date,
                            "type": type,
                            food_added: req.params.mealId,
                            "amount": parseInt(amount), 
                            calories: result/amount,
                            total_calories_added: result
                        };
                        res.status(200).send(respons);
                        res.end();
                    }).catch((error) => {
                        res.status(400).send(error);
                        res.end();
                    });                
            }).catch((error) => {
                res.status(400).send(error);
                res.end();
            });
    });
}