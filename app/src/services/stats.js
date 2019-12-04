const Stats = require('@app/models/stats');
const User  = require('@app/models/user');
const year = new Date().getFullYear();

/* toDo
    /users/:id/stats/idealWeight              ---> <real>
    /users/:id/stats/weightPrediction         ---> <real>


    /users/:id/stats/weeklyCalories           ---> <[se ha mangiato più o meno, giorno per giorno]>


    /stats/users/:id/weightTrending          ---> <[gli ultimi pesi]>
    /stats/users/:id/weightTrending/:days    ---> <[i pesi degli ultimi X giorni]>
*/


/*
*  @param {The user ID} id
*
*  returns a JSON containig ==> the weight you should have
*/
async function idealWeight(id){
  return new Promise(async function(resolve,reject){
    userData = (await User.getUser(id)
                         .then((data)=>{return data;})
                         .catch((err)=>{reject(err);}))[0];

    //checking if the user has valid parameters
    if (!userData['height']){
      reject({message:'height not set for the user'});
    }else if (!userData['gender']){
      reject({message:'gender not set for the user'});
    }

    //calculating the ideal weight
    idealWeight = 24 * userData['height']*userData['height']/10000;
    if (userData['gender']=='F'){
      idealWeight += 24* (0.11 - userData['height']);
    }


    resolve({idealWeight:idealWeight});
    
  });
}


/*
*  @param {The user ID} id
*
*  returns a JSON containig ==> your weight in a month time (linear regression)
*/
async function weightPrediction(id){
  return new Promise(async function(resolve,reject){   
    userData = (await User.getUser(id)
                         .then((data)=>{return data;})
                         .catch((err)=>{reject(err);}))[0];

    if (!userData['weight']){
      reject({message:'no weight specified for the user'});
    }

    oldWeights = await Stats.getWeights(id)
                            .then((res)=>{return res;})
                            .catch((err)=>{reject(err);});


    weightPrediction = userData['weight'];
    /*  if i have more than 1 weight i can try a prediction  

        linear prediction:
          weightInKdays = actualWeight 
                        + COV(weight,time) * sqrt(var(weight)/var(time)) * Kdays

        X := time  ;   Y:= weight
    */               
    if (oldWeights.length>0){
      today = new Date();
      Y = [userData['weight']];
      X = [0];
      // i will need E(X) E(Y) E(XY) to find covariance
      // and VAR(X) var(Y) to find the line
      XYmean = 0;
      Ymean = 0;
      Xmean = 0;
      Xvar=0;
      Yvar=0;
      num = 0;

      for (let i=0; i<oldWeights.length; i++){
        let w = oldWeights[i]['weight'];
        let d = oldWeights[i]['change_date'];

        //both variables defined
        if (d && w){
          let diff = parseInt((new Date(d)-today)/ (1000 * 3600 * 24));
          //in the last 80 days
          if (diff < 80){
            //use it to calc the mean
            Y = Y.concat(w);
            X = X.concat(diff);
            Ymean  += w;
            Xmean  += diff;
            XYmean += w*diff;

            num++;
          }
        }
      }
      Ymean /= num;
      Xmean /= num;
      XYmean /= num;
      //calc the variance
      for (let i=0; i<oldWeights.length; i++){
        let w = oldWeights[i]['weight'];
        let d = oldWeights[i]['change_date'];

        if (d && w){
          let diff = parseInt((new Date(d)-today)/ (1000 * 3600 * 24));
          Yvar += Math.pow(Ymean-w,2);
          Xvar += Math.pow(Xmean-diff,2);
        }
      }
      Yvar /= num;
      Xvar /= num;

      let coefficient = (XYmean/Xmean/Ymean) * Math.sqrt(Yvar/Xvar);
      weightPrediction = userData['weight'] + coefficient*30;
    }


    
    resolve({MonthlyWeightPrediction:weightPrediction});

  });
}

/*
*  @param {The user ID} id
*
*  returns a JSON containig ==> if you have respected your diet in the last days
*/
async function caloriesTrending(id,days=7){
  return new Promise(async function(resolve,reject){

    //need 
    reject({message:'not implemented yet'});

    today = new Date();
    for (let i=0; i<=days; i++){
      day = new Date(today.getDate() - i*1000*3600*24);


    }


  });
}

/*
*  @param {The user ID} id
*
*  returns a JSON containig ==> your last weights
*/
async function weightTrending(id,days=7){
  return new Promise(async function(resolve,reject){

    oldWeights = await Stats.getWeights(id)
                            .then((res)=>{return res;})
                            .catch((err)=>{reject(err);});
    today = new Date();

    trend = [];

    for (let i=0; i<oldWeights.length; i++){
      let w = oldWeights[i]['weight'];
      let d = oldWeights[i]['change_date'];

      if (d && w){
        let diff = parseInt((today-new Date(d))/ (1000 * 3600 * 24));
        if (diff<=days)
          trend = trend.concat({date:d, weight:w});
      }
    }

    resolve({weightTrending:trend});
  });
}




/*
*  @param {The user ID} id
*  
*  returns a JSON cointaining ==> all the stats above
*/
async function getStats(id) {
  return new Promise(async function(resolve,reject){

    reject({message:'not implemented yet'});

  });
}



module.exports = {
  idealWeight,
  weightPrediction,
  caloriesTrending,
  weightTrending,
  getStats
};

