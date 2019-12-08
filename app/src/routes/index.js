const { Router } = require('express');

const users = require('./users');
const drinks = require ('./drinks_route');
const calories = require('./calories');
const meals = require('./meal_route');
const stats = require('./stats');

module.exports = () => {
  const routes = Router();
  users(routes);
  drinks(routes);
  calories(routes);
  meals(routes);
  stats(routes);

  return routes;
};
