const client = require('./client'),
  redisClient = require('./redisCli'),
  csv = require('csv'),
  raccoon = require('raccoon');
  path = require('path'),
  jsonfile = require('jsonfile');

const file = path.join(__dirname, '../sampleContent/subjects.json');

const Subject = client.Subject,
  User = client.User,
  sequelize = client.sequelize;

redisClient.flushall();

sequelize.sync({force: true}).then(function(){
  const insertSubject = (subName) => {
    const subj = Subject.build({
      name: subName
    });
    subj.save().catch(function(error) {
      if (error) { console.log(error); }
    });
  };

  const insertUserSubLists = function(user, subName, rating){
    const userId = user.id;
    Subject.findOne({ where: {name: subName} }).then((subject) => {
      const subId = subject.id;
      if (rating > 3){
        raccoon.liked(userId, subId);
      } else if (rating === '') {
        // do nothing
      } else {
        raccoon.disliked(userId, subId);
      }        
    }).catch(function(err) {
      console.log('err', err);
    });
  };

  const subjectRecs = jsonfile.readFileSync(file);
  const subjectNames = subjectRecs[0];

  for (let subj in subjectNames) {
    if (subj !== 'username') {
      insertSubject(subj);
    }
  }

  for (let i = 0; i < subjectRecs.length; i++) {
    const row = subjectRecs[i];

    const username = row['username'];

    User.create({name: username}).then(function(user){
      for (let key of Object.keys(row)) {
        if (key === 'username') { continue; }
        const subjectName = key;
        const rating = row[key];
        insertUserSubLists(user, subjectName, rating);
      }
    });
  }

  setTimeout(function(){
    console.log('timeout');
    process.exit();
  }, 10000);
});


