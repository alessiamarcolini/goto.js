const { Router } = require('express');

const users = require('./users');
//const meals = require('./meal_route');
const drinks = require('./drink_route');

module.exports = () => {
  const routes = Router();
  users(routes);
  //meals(routes);
  drinks(routes);

  return routes;
};

// The middleware folder should contain any custom middleware you define.
// For example, an authentication middleware.
// Some examples can be found at
//    https://github.com/santiq/bulletproof-nodejs/tree/master/src/api/middlewares
