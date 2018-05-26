const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let cache = null;

/**
* @param {string} username
* @returns {any}
*/
module.exports = (username, roomId, context, callback) => {
  let uri = process.env['MONGO_URI'];

  try {
    if (cache === null) {
      MongoClient.connect(uri, (error, db) => {
        if (error) {
          console.log(error['errors']);
          return callback(error);
        }
        cache = db;
        getTime(db, username, roomId, callback);
      });
    } else {
      getTime(cache, username, roomId, callback);
    }
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

const getTime = (db, username, roomId, callback) => {
  db
    .collection('users')
    .findOne(
      {username: username, roomId: roomId},
      { timeLeft: 1 },
      (error, result) => {
        if (error) {
          console.log(error);
          return callback(null, error);
        }
        return callback(null, result);
      }
    );
};
