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

module.exports = {
  create,
  getAll
};
