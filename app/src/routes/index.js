const { Router } = require('express');

const users = require('./users');
const meals = require('./meal_route');

module.exports = () => {
  const routes = Router();
  users(routes);
  meals(routes);

  return routes;
};
