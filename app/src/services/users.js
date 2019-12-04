const User = require('@app/models/user');


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

module.exports = {
  createUser,
  changeUserWeight,
  changeUserHeight,
  changeUserGender,
  changeUserActivityLevel,
};
