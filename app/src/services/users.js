const User = require('../models/user');
const Laf = require('../models/laf');
const User_meal = require('../models/user_meal');

const YEAR = new Date().getFullYear(); // current year

/**
 * This service provides user creation and validation of values.
 * Has to check that a name and a birth_date is provided in the request body.
 * @param {User} user 
*/
async function createUser(user) {
  if (!user) {
    throw Error('User parameter required.');
  }

  if (!user.name || !user.birth_date) {
    throw Error('An user should have a name and birth date.');
  }

  return new Promise((resolve,reject) => {
    User.createUser(user)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


/**
 * This service provides a weight change for a specific user.
 * Has to check that weight provided is logically valid (positive)
 * @param {ID User} id 
 * @param {Weight} weight
*/
async function changeUserWeight(id,weight) {
  if(weight <= 0.0){
    throw Error('Weight must be a positive number.');
  }


  return new Promise((resolve,reject) => {
    User.changeUserWeight(id,weight)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * This service provides a height change for a specific user.
 * Has to check that height provided is logically valid (positive)
 * @param {ID User} id 
 * @param {Height} height
*/
async function changeUserHeight(id,height) {
  if(height <= 0.0){
    throw Error('Height must be a positive number.');
  }

  return new Promise((resolve,reject) => {
    User.changeUserHeight(id,height)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * This service provides a gender change for a specific user.
 * Has to check that gender provided is of three options (Male,Female,Other)
 * @param {ID User} id 
 * @param {Gender} gender
*/
async function changeUserGender(id,gender){
  if(gender !== 'M' && gender !== 'F' && gender !== 'O'){
    throw Error('Gender must be one of three choices (Male,Female or Other).');
  }

  return new Promise((resolve,reject) => {
    User.changeUserGender(id,gender)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * This service provides an activity level change for a specific user.
 * Has to check that the level provided is of four options (A (light),B (medium),C (high), N (none))
 * @param {ID User} id 
 * @param {Activity Level} activity
*/
async function changeUserActivityLevel(id,activity){
  if(String(activity) !== 'A' && String(activity) !== 'B' && String(activity) !== 'C' && String(activity) !== 'N' ){
    throw Error('Activity must be one of four choices (A,B,C or N).');
  }

  return new Promise((resolve,reject) => {
    User.changeUserActivityLevel(id,activity)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * This service provide the daily calories amount that a user should take.
 * @param {ID User} id_user 
 */

async function getDailyCalories(id_user){

  if (!id_user) {
    throw Error('User id required.');
  }

  return new Promise(async (resolve, reject) => {

    try{
      let userInfo = await User.getUser(id_user)
                                .then((res) => {
                                  if (res[0]){
                                    if (res[0]['weight'])
                                      return res[0];
                                    else
                                      reject({message: 'Error: weight not set.'});
                                  }
                                  else 
                                    reject({message: 'Error: user not found.'});
                                });
      let BMR = userInfo['weight'] * 38; // Basal Metabolic Rate

      let gender = 'O'
      if (userInfo['gender'] != undefined)
        gender = userInfo['gender'];
      
      let age = YEAR - new Date(userInfo['birth_date']).getFullYear();
      
      let ageType = '';
      if (age <= 59)
        ageType = 'A';
      else if (age <= 74)
        ageType = 'B';
      else
        ageType = 'C';
      
      let activityLevel = 'N'
      if (userInfo['activity'] != undefined)
        activityLevel = userInfo['activity'];
      let laf_factor = await Laf.getLafFactor(gender, ageType, activityLevel)
                                .then((res) => {
                                  if (res)
                                    return res;
                                  else 
                                    reject({message: 'Error: Laf factor not found.'});
                                })
                                .catch((error) => {
                                  reject(error);
                                })
                                ;

      let dailyCalories = BMR * laf_factor;
      resolve({
        'id_user': userInfo.id_user, 
        'name': userInfo.name, 
        'gender': userInfo.gender,
        'activity': userInfo.activity,
        'height': userInfo.height, 
        'weight': userInfo.weight, 
        'dailyCalories' : dailyCalories}
      );
                                              
    }
    catch(e){
      reject(e);
    }

  });
}

/**
 * This service provide the amount of calories left that a user should take (today), or should have taken (the date provided).
 * @param {ID User} id_user 
 */
async function getRemainingCalories(id_user){

  if (!id_user) {
    throw Error('id_user required.');
  }

  return new Promise(async (resolve, reject) => {

    try{

      let json;
      await getDailyCalories(id_user)
        .then((result) =>{
          json = result;
        })
        .catch((error) =>{
          reject(error);
        })
      


      let calories_remain;
      let date = new Date()
      let date_formatted = date.getFullYear()  + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
      await User_meal.getRemainingCalories(id_user,date_formatted)
        .then((result) =>{
          calories_remain = result;
        })
        .catch((error) => {
          reject(error);
        })


      if(!calories_remain)
        calories_remain = 0;
      
      calories_remain = json.dailyCalories - calories_remain;
      json.remainingCalories = calories_remain;

      resolve(json);

    }
    catch(e){
      reject(e);
    }

  });
}

module.exports = {
  createUser,
  changeUserWeight,
  changeUserHeight,
  changeUserGender,
  changeUserActivityLevel,
  getDailyCalories,
  getRemainingCalories
};
