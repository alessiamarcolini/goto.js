const { Router } = require('express');
const auth = require ('./middlewares/auth');
const drink = require('../models/drink_model');
const route = Router();


module.exports = async function(routes) {
    routes.use('/', route);

    routes.use('/:userId', auth.userAuth);

    route.get('/:userId/:drinkId/:amount/drink', async (req, res)=>{ //drinId default 0 = water
        const amount = parseInt (req.params.amount);
        await drink.insertDrink(req.params.userId, 0, amount, date) // amount [ml]
            .then((result) => {
                res.status(200).send("Drink Insertion Completed!");
                res.end();
            })
            .catch((error) => {
                res.status(400).send(error);
                res.end();
            });
    });
    
    route.delete('/delete/:idUserDrink/drink', async (req, res)=> {
        await drink.deleteDrink(req.params.idUserDrink)
        .then(() => {
            res.status(200).send("Delete complited");
            res.end();
        }).catch((error) => {
            res.status(400).send(error);
            res.end();
        });
    });

    route.post('/edit/:idUserDrink/:amount/:date/drink', async (req,res)=>{
        if(get.params.amount == '0' && get.params.date != undefined){
            await drink.modifyDate(get.params.idUserDrink, get.params.date)
            .then(() => {
                res.status(200).send("Date modified");
                res.end();
            }).catch((error) => {
                res.status(400).send(error);
                res.end();
            });
        }
        else{
            if(get.params.date == '0' && get.params.amount != undefined){
                await drink.modifyAmaunt(get.params.idUserDrink, get.params.amount)
                .then(() => {
                    res.status(200).send("Amount modified");
                    res.end();
                }).catch((error) => {
                    res.status(400).send(error);
                    res.end();
                });
            }
            else{
                res.status(406).send("Ambiguos");
                res.end();
            }
        }
    });
}