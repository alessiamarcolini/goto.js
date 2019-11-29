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

module.exports = {
  createUser,
  changeUserWeight,
  changeUserHeight
};
