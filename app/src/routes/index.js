const { Router } = require('express');

const users = require('./users');
const meals = require('./meal_route');

module.exports = () => {
  const routes = Router();
  users(routes);
  meals(routes);
  stats(routes);
  
  return routes;
};
