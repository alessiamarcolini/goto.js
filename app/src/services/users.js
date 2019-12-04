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
              response.Name = "Modified";
            })
            .catch(() => {
              reject(error);
            });
        }
        if(surname !== undefined){
          await User.changeUsersurname(id_user,surname)
            .then(() => {
              response.Surname = "Modified";
            })
            .catch(() => {
              reject(error);
            });
        }
        if(gender !== undefined){
          await User.changeUserGender(id_user,gender)
            .then(() => {
              response.Gender = "Modified";
            })
            .catch(() => {
              reject(error);
            });
        }
        if(activity !== undefined){
          if(isValidActivity(activity)){
            await User.changeUserActivityLevel(id_user,activity)
              .then(() => {
                response.Activity = "Modified";
              })
              .catch(() => {
                reject(error);
              });
          }
        }
        if(weight !== undefined){
          if(isValidValue(weight)){
            await User.changeUserWeight(id_user,weight)
              .then(() => {
                response.Weight = "Modified";
              })
              .catch(() => {
                reject(error);
              });
          }
        }
        if(height !== undefined){
          if(isValidValue(weight)){
            await User.changeUserWeight(id_user,weight)
              .then(() => {
                response.Height = "Modified";
              })
              .catch(() => {
                reject(error);
              });
          }
        }
        if(isEmptyObject(response)){
            response.message = "Nothing to modify";
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

module.exports = {
  createUser,
  modifyUser
};
