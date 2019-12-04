const { Router } = require('express');
const auth = require('./middlewares/auth');
const service = require('../services/meal_service');
const route = Router();

module.exports = async function(routes) {

    routes.use('/meal', route);

    route.use('/', auth.userAuth);

    /**
     * Route to put a new meal in the system.
     * Request format:
     * /PUT : meal/
     * JSON = {
     *      "userId" : <id>,
     *      "foodId" : <id>,
     *      "amount" : <number>,
     *      "date" : <date yyyy-MM-dd>,
     *      "hours" : <number>
     * }
     */
    route.put('/', auth.foodAuth, async (req, res)=>{
        const amount = req.body.amount;
        await service.insert(req.body.userId, req.foodId, amount, req.body.date.toString(), req.body.hours)
            .then((result) => {
                res.status(200).send(result);
                res.end();                               
            }).catch((error) => {
                res.status(400).send(error);
                res.end();
            });
    });

    /**
     * Route to delete a meal from the system.
     * Request format:
     * /DELETE : meal/
     * JSON = {
     *      "userId" : <id>,
     *      "mealId" : <id>
     * }
     */
    route.delete("/", auth.modifyValidMeal ,async(req, res) => {
        await service.deleteMeal(req.body.mealId)
            .then(() => {
                res.status(200).send("Delete complited");
                res.end();
            }).catch((error) => {
                res.status(400).send(error);
                res.end();
            });
    });

    /**
     * Route to modify a meal in the system.
     * Request format:
     * /POST : meal/
     * JSON = {
     *      "userId" : <id>,
	 *      "mealId" : <id>,
	 *      "foodId" : <id>,
     *      "amount" : <number>,
     *      "date"   : <date>,
     *      "hours"   : <hour>
     * }
     */
    route.post("/", auth.modifyValidMeal, auth.foodExists, async(req, res) => {
        await service.modify(req.body.mealId, req.body.foodId, req.body.amount, req.body.date, req.body.hours)
            .then((result) => {
                res.status(200).send(result);
                res.end();
            }).catch((error) => {
                res.status(400).send(error);
                res.end();
            });
    });
}