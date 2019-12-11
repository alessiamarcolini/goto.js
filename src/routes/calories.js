const { Router } = require('express');

const UserService = require('../services/users');

const route = Router();

module.exports = async function(routes) {
    routes.use('/calories', route);


    /**
		* Route to get the daily calories amount that a user should take.
		* Request format:
		* /GET : calories/daily/:id
		* response: JSON = {
        *		"id_user": <id>,
                "name": <name>,
                "birth_date": <birth_date>,
                "gender": <gender>,
                "activity": <activity>,
                "height": <height>,
                "weight": <weight>,
                "dailyCalories": <dailyCalories>}
		* }
  */
    route.get('/daily/:id_user', async (req, res) => {

        await UserService.getDailyCalories(req.params.id_user)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json(error);
        })
    });

    /**
        * Route to get the daily remaining calories amount for a specific user.
        * This get actually calls back on the services used by dailyCalories
        * Request format:
        * /GET : calories/remaining/:id
        * response : JSON = {
        *   "id_user" : <id>,
        *   "name" : <name>,
        *   "height" : <height>,
        *   "weight" : <weight>,
        *   "remainingCalories" : <remainingCalories>
        *   "dailyCalories" : <dailyCalories>
        *}
    */
    route.get('/remaining/:id_user', async (req, res) => {
        await UserService.getRemainingCalories(req.params.id_user)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json(error);
        })
    });


    route.get('/remaining/:id_user/', async (req, res) => {
        await UserService.getRemainingCalories(req.params.id_user)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json(error);
        })
    });
}