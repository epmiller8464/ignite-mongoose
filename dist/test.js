'use strict';

var test = require('tape');
var connect = require('./index').Connect;
var UserModel = require('./index').Models.UserModel;

test('connection and model test', function (t) {
  var dbOptions = {
    db: { native_parser: true },
    server: { poolSize: 5, socketOptions: { keepAlive: 1 } },
    promiseLibrary: require('bluebird')
  };

  var db = connect('mongodb://localhost/igniteDB', dbOptions);
  db.on('open', console.info.bind(console, 'connection open'));
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function () {
    var seed = {
      "provider_id": "1234",
      "accessToken": "access_token",
      "displayName": "Some User",
      "name": "Some User",
      "provider": "some entity"
    };
    t.equal(UserModel.collection.findOne().constructor, require('bluebird'));

    UserModel.findOneAndUpdate({ provider_id: seed.id }, seed, { upsert: 1, new: true }, function (err, user) {
      if (err || !user) {
        t.fail('opps test failed');
      } else {
        t.notEqual(null, user.toObject());
        user.remove(function (e) {
          t.equal(null, e);
          t.end();
          process.exit();
        });
      }
    });
  });
});
//# sourceMappingURL=test.js.map