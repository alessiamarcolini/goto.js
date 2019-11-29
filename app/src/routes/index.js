const { Router } = require('express');

const users = require('./users');
const stats = require('./stats');

module.exports = () => {
  const routes = Router();
  users(routes);
  stats(routes);

  return routes;
};
