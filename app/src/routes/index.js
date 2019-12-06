const { Router } = require('express');

const users = require('./users');
const calories = require('./calories');

module.exports = () => {
  const routes = Router();
  users(routes);
  calories(routes);

  return routes;
};
