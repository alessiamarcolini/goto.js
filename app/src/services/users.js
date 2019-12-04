const User = require('@app/models/user');

async function create(user) {
  if (!user) {
    throw Error('user parameter required.');
  }
  console.log(user)

  if (!user.name || !user.password) {
    throw Error('An user should have a name and email.');
  }

  try{
    const res = await User.create(user);
    return res;
  }catch(e){
    throw(e)
  }
}

async function getAll() {
  return User.getAll();
}

async function getDailyCalories(user){
  if (!user) {
    throw Error('form data required.');
  }
  console.log(user)

  if (!user.id_user) {
    throw Error('user_id required.');
  }

  return new Promise((resolve, reject) => {
    User.getDailyCalories(user.id_user)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  create,
  getAll
};
