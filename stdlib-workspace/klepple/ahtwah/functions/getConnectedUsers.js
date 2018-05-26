const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let cache = null;

/**
 * API to get the list of connected users based on a specific room code
 * @param {string} roomId the four letter code for the room
 * @returns {array} an array of connected users
*/
module.exports = (roomId, context, callback) => {
  let uri = process.env['MONGO_URI'];

  try {
    if (cache === null) {
      MongoClient.connect(uri, (error, db) => {
        if (error) {
          console.log(error['errors']);
          return callback(error);
        }
        cache = db;
        readUsers(db, roomId, callback);
      });
    } else {
        readUsers(cache, roomId, callback);
    }
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