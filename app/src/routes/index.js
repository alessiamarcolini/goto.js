const { Router } = require('express');

const stats = require('./stats');

module.exports = () => {
  const routes = Router();
  stats(routes);

  return routes;
};
