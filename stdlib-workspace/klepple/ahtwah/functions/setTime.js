const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let cache = null;

/**
* @param {string} username
* @param {number} time
* @returns {any}
*/
module.exports = (username, time, context, callback) => {
  let uri = process.env['MONGO_URI'];

  try {
    if (cache === null) {
      MongoClient.connect(uri, (error, db) => {
        if (error) {
          console.log(error['errors']);
          return callback(error);
        }
        cache = db;
        updateTime(db, username, time, callback);
      });
    } else {
      updateTime(cache, username, time, callback);
    }
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

const updateTime = (db, username, time, callback) => {
  db
    .collection('users')
    .updateOne(
      { username: username},
      { $set: { timeLeft: time } },
      (error, result) => {
        if (error) {
          console.log(error);
          return callback(null, error);
        }
        return callback(null, result);
      }
    );
};
