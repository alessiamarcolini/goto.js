const Stats = require('@app/models/stats');


const year = new Date().getFullYear();

/*
  Men BMR   = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) - (5.677 x age in years)
  Women BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) - (4.330 x age in years)

  ritorna un json con ==> calorie mangiate e da mangiare
*/
var todayCalories = async function(id){
  return new Promise(async function(resolve,reject){

    try{
      //prendo le info dal DB
      let userMealsP = Stats.getTodayMeals(id);
      let userInfo   = (await Stats.getInfo(id).then((res)=>{return res;})) [0];
      let userMeals  = await userMealsP.then((res)=>{return res;});

      //calcolo il daily intake
      let needed = 0;
      if (userInfo['gender']=='F'){
        needed = 447593 + 9247*userInfo['weight'] + 3098*userInfo['height'] - (year-new Date(userInfo['birth_date']).getFullYear())*4330;
      }else{
        needed = 88362 + 13197*userInfo['weight'] + 4799*userInfo['height'] - (year-new Date(userInfo['birth_date']).getFullYear())*5677;
      }

      //calcolo le galorie già assunte
      let tot = 0;
      for (let i=0; i<userMeals.length; i++){
        food = userMeals[i];
        tot += food['quantity']*food['calories_k'];
      }

      resolve({caloriesToEat:needed, caloriesEaten:tot});
    }catch(e){
      reject(e);
    }
  });
}

/*
  ritorna un json con ==> quantità d'acqua bevuta e da bere
*/
async function todayWater(id){
  return new Promise(async function(resolve,reject){

    try{
      //prendo le info dal DB
      userWater = await Stats.getTodayWater(id).then((res)=>{return res;});

      //calcolo l'acqua da bere
      let toDrink = 3000 - Math.abs((new Date().getMonth())-6)*100;


      //calcolo l'acqua già bevuta
      let tot = 0;
      for (let i=0; i<userWater.length; i++){
        tot += userWater[i]['quantity_ml'];
      }

      resolve({waterToDrink:toDrink, waterDrunk:tot});
    }catch(e){
      reject(e);
    }
  });
}

/*
  ritorna un json con ==> pesi recenti, previsione
*/
async function weightStats(id){
  return new Promise(async function(resolve,reject){
    try{
      //prendo le info dal DB
      let userWeightsP = Stats.getWeights(id);
      let userInfo   = (await Stats.getInfo(id).then((res)=>{return res;})) [0];
      let userWeights  = await userWeightsP.then((res)=>{return res;});

      //last 5 weights
      let weigths = [];
      for (let i=0; i<5 && i<userWeights.lenght; i++){
        weigths.concat(userWeights[i]['weight']);
      }

      //probably right weight
      let iWeight = (userInfo['height'] - 100 - userInfo['weight'])*0.9;


      resolve({last_weights:weigths, idealWeight:iWeight});
    }catch(e){
      reject(e);
    }
  });
}




/*
  ritorna un json con ==> tutte le statistiche sopra
*/
async function getStats(id) {
  return new Promise(async function(resolve,reject){
    try{
      //prendo le info dalle funzioni sopra
      let caloriesP = todayCalories(id);
      let waterP    = todayWater(id);
      let weightP   = weightStats(id);
      let calories = await caloriesP.then((res)=>{return res;});
      let water = await waterP.then((res)=>{return res;});
      let weight = await weightP.then((res)=>{return res;});
      


      resolve({calories:calories, water:water, weight:weight});
    }catch(e){
      reject(e);
    }
  });
}



module.exports = {
  getStats,
  todayCalories,
  weightStats,
  todayWater
};

