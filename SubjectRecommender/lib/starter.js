module.exports = exports = (function(){  

  const async = require('async'),
  client = require('./client'),
  _ = require('underscore'),
  csv = require('csv'),
  raccoon = require('raccoon');
  Promise = require('bluebird');

  const Subject = client.Subject,
    User = client.User,
    sequelize = client.sequelize;

  const buildLoginObject = function(userName, callback){
    let loginObject = {};

    Promise.all([
      User.findOrCreate({where: {name: userName}}),
      User.findAll(),
      Subject.findAll()
    ]).spread(function(userObj, allUsers, allSubjects) {
      const user = userObj[0];
      const userId = user.id;
      raccoon.stat.allWatchedFor(userId).then((allWatched) => {
        raccoon.stat.recommendFor(userId, 30).then((recs) => {
          loginObject = {
            userId,
            allUsers,
            allSubjects: allSubjects,
            username: userName,
            alreadyWatched: allWatched,
            recommendations: recs
          };
          callback(loginObject);
        });
      });
    });
  };

  return {
    buildLoginObject
  };
}).call(this);