const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

/**
 * API for getting the time remaining for a specific user
* @param {string} username the username
* @param {string} roomId the id of the room the user is in
* @returns {any}
*/
module.exports = (username, roomId, context, callback) => {
  let uri = process.env['MONGO_URI'];

  try {
      MongoClient.connect(uri, (error, client) => {
        let db = client.db('ahtwahdb');
        if (error) {
          console.log(error['errors']);
          return callback(error);
        }
        getTime(db, username, roomId, callback);
      });
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
      { timeLeft: true },
      (error, result) => {
        if (error) {
          console.log(error);
          return callback(null, error);
        }
        let formattedResult = '{ "totalTime": "' + result.timeLeft + '"}';
        return callback(null, JSON.parse(formattedResult));
      }
    );
};
