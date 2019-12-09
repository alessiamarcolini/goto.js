const { Router } = require('express');
const auth = require ('./middlewares/auth');
const service = require('../services/drink_service');
const route = Router();


module.exports = async function(routes) {
    routes.use('/drink', route);

    routes.use('/', auth.userAuth);

    route.put('/', async (req, res)=>{
        const amount = req.body.amount
        await service.insertDrink(req.body.userId, amount, req.body.date.toString()) // amount [ml]
            .then((result) => {
                res.status(200).send("Drink Insertion Completed!");
                res.end();
            })
            .catch((error) => {
                res.status(400).send(error);
                res.end();
            });
    });
    
    route.delete('/', auth.modifyValidDrink, async (req, res)=> {
        await service.deleteDrink(req.body.drinkId)
        .then(() => {
            res.status(200).send("Delete Completed!");
            res.end();
        }).catch((error) => {
            res.status(400).send(error);
            res.end();
        });
    });

    route.post("/", auth.modifyValidDrink, async(req, res) => {
        await service.modifyDrink(req.body.drinkId, req.body.amount, req.body.date)
            .then((result) => {
                res.status(200).send(result);
                res.end();
            }).catch((error) => {
                res.status(400).send(error);
                res.end();
            });
    });
}