const { Router } = require('express');
const auth = require('./middlewares/auth');
const meal = require('../models/meal_model');
const route = Router();

//Router.use(auth.userAuth(req,res,next));
//Router.use(auth.mealAuth(req,res,next));

module.exports = async function(routes) {

    routes.use('/meal', route);

    route.use('/:userId/:mealId/', auth.userAuth, auth.food);

    route.get('/:userId/:mealId/:amount', async (req, res)=>{
        const amount = req.params.amount;
        meal.insertMeal(req.params.userId, req.foodId, amount)
            .then((result) => {
                res.status(200).send("Insertion completed! ;)");
                res.end();
            }).catch((error) => {
                res.status(400).send(error);
                res.end();
            });
    });

}