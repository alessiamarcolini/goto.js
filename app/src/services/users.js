const User = require('@app/models/user');

// User creation service will only import Name and Birth_Date
// Other values will not be inserted.
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

// The function to change Weight must have weight > 0.0
// Mostly because it's needed to do calculations, else it makes all calculations 0.0
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

// The function to change Height must have height > 0.0
// Mostly because it's needed to do calculations, can't be value / 0.0
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

// The function to change Gender can have 3 types
// 3 of which are important for the laf table (M,F,O)
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

// The function to change Activity Level can have 4 types
// 3 of which are important for the laf table (A,B,C)
// The 4th choice, N, is just to say that the user is doing no activity at all
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
