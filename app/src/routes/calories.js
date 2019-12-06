const { Router } = require('express');

const UserService = require('@app/services/users');
const user = require('../models/user')

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
}