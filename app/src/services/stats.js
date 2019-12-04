const Stats = require('@app/models/stats');


const year = new Date().getFullYear();

/*
*  Men BMR   = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) - (5.677 x age in years)
*  Women BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) - (4.330 x age in years)
*
*  returns a json containig ==> calories-eaten-today, calories-to-eat
*/
async function respectedCalories(id, days){
  return new Promise(async function(resolve,reject){

    /stats/users/:id/idealWeight              ---> <real>

    /users/:id/stats/weeklyCalories           ---> <[se ha mangiato più o meno, giorno per giorno]>


    /stats/users/:id/weightTrending          ---> <[gli ultimi pesi]>
    /stats/users/:id/weightTrending/:days    ---> <[i pesi degli ultimi X giorni]>



    resolve({daysCounted:days, respected:respected});

  });
}


/*
*  @param {The user ID} id
*
*  returns a JSON containig ==> the last 5 weights, your ideal weight
*/
async function weightStats(id){
  return new Promise(async function(resolve,reject){
    try{
      //prendo le info dal DB
      let userWeightsP = Stats.getWeights(id);
      let userHeight   = await Stats.getInfo(id)
                                   .then((res)=>{
                                      if(res[0] && res[0]['height']){
                                        return res[0]['height'];
                                      }else{
                                        reject({message:'record non valido'});
                                      }
                                   });
      let userWeights  = await userWeightsP.then((res)=>{return res;}).catch((e)=>{throw(e);});

      //last 5 weights
      let weigths = [];
      for (let i=0; i<5 && i<userWeights.lenght; i++){
        weigths.concat(userWeights[i]['weight']);
      }

      //probably right weight
      let goodWeight = (userHeight - 100);


      resolve({lastWeights:weigths, idealWeight:goodWeight});
    }catch(e){
      reject(e);
    }
  });
}




/*
*  @param {The user ID} id
*  
*  returns a JSON cointaining ==> all the stats above
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
      


      resolve({
        //caloriesToEat: calories['caloriesToEat'],
        //caloriesEaten: calories['caloriesEaten'],
        lastWeights:weight['lastWeights'],
        idealWeight:weight['idealWeight']
      });
    }catch(e){
      reject(e);
    }
  });
}



module.exports = {
  getStats,
  respectedCalories,
  weightStats,
  todayWater
};

