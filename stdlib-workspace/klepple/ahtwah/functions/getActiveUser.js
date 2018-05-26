const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

/**
 * API for getting the time remaining for a specific user
* @param {string} roomId the id of the room the user is in
* @returns {any}
*/
module.exports = (roomId, context, callback) => {
  let uri = process.env['MONGO_URI'];

  try {
      MongoClient.connect(uri, (error, client) => {
        let db = client.db('ahtwahdb');
        if (error) {
          console.log(error['errors']);
          return callback(error);
        }
        getActiveUser(db, roomId, callback);
      });
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

const getActiveUser = (db, roomId, callback) => {
  db.collection('rooms').findOne(
      {roomId: roomId},
      { isPersonCountingDown: true },
      (error, result) => {
        if (error) {
          console.log(error);
          return callback(null, error);
        }
        let formattedResult = '{ "isPersonCountingDown": "' + result.isPersonCountingDown + '"}';
        return callback(null, JSON.parse(formattedResult));
      }
    );
};
