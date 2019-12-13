const Stats = require('@app/models/stats');
const User  = require('@app/models/user');
const year = new Date().getFullYear();


/*
*  @param {The user ID} id
*
*  returns a JSON containig ==> the weight you should have
*/
async function getIdealWeight(id){
  return new Promise(async function(resolve,reject){
    let userData = await User.getUser(id)
                         .then((data)=>{return data[0];})
                         .catch((err)=>{reject(err);});

    if (userData){

      //checking if the user has valid parameters
      if (!userData['height']){
        reject({message:'height not set for the user'});
      }else if (!userData['gender']){
        reject({message:'gender not set for the user'});
      }

      //calculating the ideal weight
      let idealWeight = 24 * userData['height']*userData['height']/10000;
      if (userData['gender']=='F'){
        idealWeight += (0.11 - userData['height'])/5;
      }


      resolve({idealWeight:idealWeight});
    }
    
  });
}


/*
*  @param {The user ID} id
*
*  returns a JSON containig ==> your weight in a month time (linear regression)
*/
async function getWeightPrediction(id){
  return new Promise(async function(resolve,reject){   
    userData = (await User.getUser(id)
                         .then((data)=>{return data[0];})
                         .catch((err)=>{reject(err);}));

    if (userData){
      if (!userData['weight']){
        reject({message:'no weight specified for the user'});
      }

      oldWeights = await Stats.getWeights(id)
                              .then((res)=>{return res;})
                              .catch((err)=>{reject(err);});


      let weightPrediction = userData['weight'];
      /*  if i have more than 1 weight i can try a prediction  

          linear prediction:
            weightInKdays = actualWeight 
                          + COV(weight,time) * sqrt(var(weight)/var(time)) * Kdays

          X := time  ;   Y:= weight
      */               
      if (oldWeights.length>0){
        let today = new Date();
        let Y = [userData['weight']];
        let X = [0];
        // i will need E(X) E(Y) E(XY) to find covariance
        // and VAR(X) var(Y) to find the line
        let XYmean = 0;
        let Ymean = 0;
        let Xmean = 0;
        let Xvar=0;
        let Yvar=0;
        let num = 0;

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

      resolve({monthlyWeightPrediction:weightPrediction});
    }

  });
}


/*
*  @param {The user ID} id
*
*  returns a JSON containig ==> your last weights
*/
async function getWeightTrending(id,days=7){
  return new Promise(async function(resolve,reject){

    let oldWeights = await Stats.getWeights(id)
                            .then((res)=>{return res;})
                            .catch((err)=>{reject(err);});

    let userData = await User.getUser(id)
                         .then((data)=>{return data[0];})
                         .catch((err)=>{reject(err);});

    if (userData){
      let today = new Date();
      let trend = [];

      if (!userData['weight']){
        reject({message:'no weight specified for the user'});
      }

      
      trend.concat({date:today, weight:userData['weight']});

      for (let i=0; i<oldWeights.length; i++){
        let w = oldWeights[i]['weight'];
        let d = oldWeights[i]['change_date'];

        if (d && w){
          let diff = parseInt((today-new Date(d))/ (1000 * 3600 * 24));
          if (diff<=days)
            trend = trend.concat({date:d, weight:w});
        }
      }

      resolve({weightTrending:trend, metadata_trendLength:trend.length});
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


    let iw = await getIdealWeight(id)
          .then((res)=>{return res;})
          .catch((err)=>{reject(err);});

    let wp = await getWeightPrediction(id)
          .then((res)=>{return res;})
          .catch((err)=>{reject(err);});

    let wt = await getWeightTrending(id)
          .then((res)=>{return res;})
          .catch((err)=>{reject(err);});

    if (iw && wp && wt){
      resolve({
        idealWeight: iw['idealWeight'],
        monthlyWeightPrediction: wp['monthlyWeightPrediction'],
        weightTrending: wt['weightTrending'],
        metadata_trendLength: wt['metadata_trendLength']
      });
    }


  });
}



module.exports = {
  getIdealWeight,
  getWeightPrediction,
  getWeightTrending,
  getStats
};

