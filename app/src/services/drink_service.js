const drink = require('../models/drink_model')

function drinkDate(date) {
    if (!isValidDate(date)) {
        let date_ob = new Date();
        return date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2);
    } else {
        return date;
    }
}

function isValidDate(d) {
    var dateReg = /^\d{4}([./-])\d{2}\1\d{2}$/;
    return d.match(dateReg) === null ? false: true;
}

async function insertDrink(userId, amount, date) {
    return new Promise(async (resolve, reject) => {
        if (amount > 0) {
            let _date = drinkDate(date);
            await drink.insertDrink(userId, amount, _date)
                .then(async () => {
                    const RESPONS = {
                        status: "Insertion completed!",
                        "date": date,
                        "amount": parseInt(amount),
                    };
                    resolve(RESPONS);
                })
                .catch((error) => {
                    reject(error);
                });
        }
        else {
            reject("Please insert a valid quantity");
        }
    });
}

async function deleteDrink(drinkId){
    return new Promise(async (resolve, reject) => {
        await drink.deleteDrink(drinkId)
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            })
    });
}

async function modifyDrink(drinkId, amount, date){
    return new Promise(async (resolve, reject) => {
        let response = {};
        if(amount !== undefined){
            if(amount > 0){
                await drink.modifyAmaunt(drinkId, amount)
                    .then(() => {
                        response.amount =  'Modified';
                    }).catch((error) => {
                        reject(error);
                    });
            }else{
                response.amount =  'Not modified, quantity not valid';
            }            
        }
        if(date !== undefined){
            if(isValidDate(date.toString())){
                await drink.modifyDate(drinkId, date)
                    .then(() => {
                        response.date = 'Modified';
                    }).catch((error) => {
                        reject(error);
                    });
            }else{
                response.date =  'Not modified, date not valid';
            }       
        }
        if(isEmptyObject(response)){
            response.message = "Nothing to modify";
        }
        resolve(response);
    });
}

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

module.exports = {
    isValidDate:isValidDate,
    insertDrink:insertDrink,
    deleteDrink:deleteDrink,
    modifyDrink:modifyDrink,
    isEmptyObject:isEmptyObject
}