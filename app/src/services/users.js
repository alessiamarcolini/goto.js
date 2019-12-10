const User = require('../models/user');
const Laf = require('../models/laf');
const User_meal = require('../models/user_meal');

const YEAR = new Date().getFullYear(); // current year
const service = require('./meal_service');

/**
 * This service provides user creation and validation of values.
 * Has to check that a name and a birth_date is provided in the request body.
 * @param {User} user
*/
async function createUser(user) {

  if (!user.name && !user.birth_date) {
    throw Error('User parameters required.');
  }
  if(!user.name || !user.birth_date) {
    throw Error('A name and a birth date are required to create a new user.');
  }
  if(!service.isValidDate(user.birth_date.toString())){
    throw Error('Birth date was not inserted correctly.');
  }

  return new Promise((resolve,reject) => {
    User.createUser(user.name,user.birth_date)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}



/**
  * This service is used to modify specific user data.
  * All values are validated by their accepted values.
  * The service only inputs correctly setted values.
  * @param {User ID} id_user 
  * @param {Name} foodId 
  * @param {Surname} amount 
  * @param {Gender} gender 
  * @param {Exercise Activity} activity 
  * @param {Weight} weight 
  * @param {Height} height 
*/
async function modifyUser(id_user, name, surname, gender, activity, weight, height){
    return new Promise(async (resolve, reject) => {
        let response = {};
        if(name !== undefined){
          await User.changeUsername(id_user,name)
            .then(() => {
              response.name = "Modified";
            })
            .catch((error) => {
              reject(error);
            });
        }
        if(surname !== undefined){
          await User.changeUsersurname(id_user,surname)
            .then(() => {
              response.surname = "Modified";
            })
            .catch((error) => {
              reject(error);
            });
        }
        if(gender !== undefined){
          await User.changeUserGender(id_user,gender)
            .then(() => {
              response.gender = "Modified";
            })
            .catch((error) => {
              reject(error);
            });
        }
        if(activity !== undefined){
          if(isValidActivity(activity)){
            await User.changeUserActivityLevel(id_user,activity)
              .then(() => {
                response.activity = "Modified";
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
        if(weight !== undefined){
          if(isValidValue(weight)){
            await User.changeUserWeight(id_user,weight)
              .then(() => {
                response.weight = "Modified";
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
        if(height !== undefined){
          if(isValidValue(height)){
            await User.changeUserHeight(id_user,height)
              .then(() => {
                response.height = "Modified";
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
        if(service.isEmptyObject(response)){
            response.message = "Nothing modified";
        }
        resolve(response);
    });
}

/**
 * Function to check that gender provided is of three options (Male,Female,Other)
 * @param {Gender} gender
*/
function isValidGender(gender){
  let valid = false;
  if(gender === 'M' || gender === 'F' || gender === 'O'){
    valid = true;
  }
  return valid;
}

/**
 * Function to check that the level provided is of four options (A (light),B (medium),C (high), N (none))
 * @param {Activity Level} activity
*/
function isValidActivity(activity){
  let valid = false;
  if(activity === 'A' || activity === 'B' || activity === 'C' || activity === 'N'){
    valid = true;
  }
  return valid;
}

/**
  * Control function for the numerical value input (has to be > 0.0)
  * @param {Value} value
*/
function isValidValue(value){
  let valid = false;
  if(value > 0.0){
    valid = true;
  }
  return valid;
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
  getRemainingCalories,
  modifyUser
  
};
