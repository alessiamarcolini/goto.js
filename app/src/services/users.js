const User = require('@app/models/user');

async function createUser(user) {
  if (!user) {
    throw Error('user parameter required.');
  }

  if (!user.name || !user.birth_date) {
    throw Error('An user should have a name and birth date.');
  }

  try{
    const res = await User.createUser(user);
    return res;
  }catch(e){
    throw(e)
  }
}

async function changeUserWeight(id,weight) {
  if(weight <= 0.0){
    throw Error('Weight must be a positive number.');
  }

  try{
    const res = await User.changeUserWeight(id,weight);
    return res;
  }catch(e){
    throw(e);
  }
}

async function changeUserHeight(id,height) {
  if(height <= 0.0){
    throw Error('Height must be a positive number.');
  }

  try{
    const res = await User.changeUserHeight(id,height);
    return res;
  }catch(e){
    throw(e);
  }
}

async function changeUserGender(id,gender){
  if(gender !== 'M' && gender !== 'F' && gender !== 'O'){
    throw Error('Gender must be one of three choices (Male,Female or Other).');
  }

  try{
    const res = await User.changeUserGender(id,gender);
    return res;
  }catch(e){
    throw(e);
  }
}

// The function to change Activity Level can have 4 types
// 3 of which are important for the laf table (A,B,C)
// The 4th choice, N, is just to say that the user is doing no activity at all
async function changeUserActivityLevel(id,activity){
  if(String(activity) !== 'A' && String(activity) !== 'B' && String(activity) !== 'C' && String(activity) !== 'N' ){
    throw Error('Activity must be one of four choices (A,B,C or N).');
  }

  try{
    const res = await User.changeUserActivityLevel(id,activity);
    return res;
  }catch(e){
    throw(e);
  }
}

module.exports = {
  createUser,
  changeUserWeight,
  changeUserHeight,
  changeUserGender,
  changeUserActivityLevel,
};
