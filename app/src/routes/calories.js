const { Router } = require('express');

const UserService = require('@app/services/users');
const user = require('../models/user')

const route = Router();

module.exports = async function(routes) {
    routes.use('/calories', route);

    route.get('/daily', async (req, res) => {

        await UserService.getDailyCalories(req.body)
        .then((retult) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json(error);
        })
    });
}