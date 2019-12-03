const { Router } = require('express');
const auth = require ('./middlewares/auth');
const drink = require('../models/drink_model');
const route = Router();


module.exports = async function(routes) {
    routes.use('/', async(req,res) => {
        console.log('Ricevuto!');
        res.status(200);
        res.end();
    });

    routes.use('/:userId', auth,userAuth)

    route.get('/:userId/:drinkId/:amount/drink', async (req, res)=>{ //drinId default 0 = water
        console.log('riconosciuto');
        const amount = req.params.amount;
        drink.insertDrink(req.params.userId, 0, amount) // amount [ml]
            .then((result) => {
                res.status(200).send("Drink Insertion Completed!");
                res.end();
            })
            .catch((error) => {
                res.status(400).send(error);
                res.end();
            });
    });
}