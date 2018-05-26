const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

/**
 * API for iterating through the list of players and returning who's turn it is
* @param {string} roomId the room id
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
        updateTodo(db, ids, completed, callback);
      });
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

const updateActiveUser = (db, ids, completed, callback) => {
  db
    .collection('todo')
    .updateMany(
      { _id: { $in: ids } },
      { $set: { completed: completed } },
      (error, result) => {
        if (error) {
          console.log(error);
          return callback(null, error);
        }
        return callback(null, result);
      }
    );
};
