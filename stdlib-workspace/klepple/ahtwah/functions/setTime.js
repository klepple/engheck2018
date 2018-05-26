const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let cache = null;

/**
* API that updates the time left for a specific user
* @param {string} username the username of the user
* @param {string} roomId the id of the room the user is connected to
* @param {number} time the time
* @returns {any}
*/
module.exports = (username, roomId, time, context, callback) => {
  let uri = process.env['MONGO_URI'];

  try {
    if (cache === null) {
      MongoClient.connect(uri, (error, client) => {
        let db = client.db('ahtwahdb');
        if (error) {
          console.log(error['errors']);
          return callback(error);
        }
        updateTime(db, username, roomId, time, callback);
      });
    } 
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

const updateTime = (db, username, roomId, time, callback) => {
  db
    .collection('users')
    .updateOne(
      { username: username, roomId: roomId},
      { $set: { timeLeft: time } },
      (error, result) => {
        if (error) {
          console.log(error);
          return callback(null, error);
        }
        let formattedResult = JSON.parse(JSON.stringify(result));
        return callback(null, formattedResult);
      }
    );
};
