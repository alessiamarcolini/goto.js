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
     *      "id_user" : <id>,
     *      "id_food" : <id>,
     *      "quantity" : <number>,
     *      "meal_date" : <date yyyy-MM-dd>,
     *      "hours" : <number>
     * }
     * In case of an invalid date the system will insert today's date
     */
    route.put('/', auth.foodAuth, async (req, res)=>{
        const quantity = req.body.quantity;
        await service.insert(req.body.id_user, req.id_food, quantity, req.body.meal_date.toString(), req.body.hours)
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
     *      "id_user" : <id>,
     *      "id_meal" : <id>
     * }
     */
    route.delete("/", auth.modifyValidMeal ,async(req, res) => {
        await service.deleteMeal(req.body.id_meal)
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
     *      "id_user" : <id>,
	 *      "id_meal" : <id>,
	 *      "id_food" : <id>,
     *      "quantity" : <number>,
     *      "meal_date" : <date yyyy-MM-dd> or number,
     *      "hours"   : <hour>
     * }
     * In case of an invalid date the system will insert the today date
     */
    route.post("/", auth.modifyValidMeal, auth.foodExists, async(req, res) => {
        await service.modify(req.body.id_meal, req.body.id_food, req.body.quantity, req.body.meal_date, req.body.hours)
            .then((result) => {
                res.status(200).send(result);
                res.end();
            }).catch((error) => {
                res.status(400).send(error);
                res.end();
            });
    });
}