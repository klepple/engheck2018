const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

/**
 * API to get the list of connected users based on a specific room code
 * @param {string} roomId the four letter code for the room
 * @returns {array} an array of connected users
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
        readUsers(db, roomId, callback);
      });
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

const readUsers = (db, roomId, callback) => {
  let cursor = db.collection('users').find({roomId: roomId});
  let connectedUsers = [];
  cursor.each((error, item) => {
    if (error) {
      console.log(error);
    }
    if (item == null) {
      return callback(null, connectedUsers);
    }
    connectedUsers.push({
      username: item.username,
      timeLeft: item.timeLeft
    });
  });
};