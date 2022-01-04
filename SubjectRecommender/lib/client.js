
const Sequelize = require('sequelize');
  config = require('./config');

const sequelize = new Sequelize(config.postgresDbName, config.postgresUsername, config.postgresPassword, {
  host: config.postgresHost,
  dialect: 'postgres'
});

var User = sequelize.define('user', {
  name: Sequelize.STRING
});

var Subject = sequelize.define('subject', {
  name: Sequelize.STRING
});

module.exports = exports = {
  sequelize,
  User,
  Subject
};

