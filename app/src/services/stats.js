const Stats = require('@app/models/stats');
/*
  note:
    array -> peso/giorno
    in base all' ultimo peso se ho mangiato più o meno
    calorie usate su totali
    water bevuta / totale
*/

async function todayCalories(){

}
async function todayWater(){

}
async function weightStats(){

}




async function getStats() {
  const answer = new Promise(function(resolve,reject){
    Stats.getMeals()
       .then((res)=>{
          resolve(res);
       })
       .catch((err)=>{
          reject(err);
       });
  });
  return(answer)
}

module.exports = {
  getStats
};
