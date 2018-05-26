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

const updateActiveUser = (db, roomId, callback) => {
  //Iterate through the list of connected players
  db.collection('rooms').find({ roomId: roomId }, (error, result) => {
    if (error) {
      console.log(error);
      return callback(null, error);
    }
    
  });
  db.collection('rooms').update({ roomId: roomId },
      { $set: { isPersonCountingDown: completed } },
      (error, result) => {
        if (error) {
          console.log(error);
          return callback(null, error);
        }
        return callback(null, result);
      }
    );
};
