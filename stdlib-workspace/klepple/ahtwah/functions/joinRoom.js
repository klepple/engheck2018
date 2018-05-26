const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let cache = null;

/**
 * API so a new user can join the room
 * @param {string} username the username
 * @param {number} timeLeft the time left on the user's clock
 * @param {string} roomId the four letter id of the room the user wants to/is currently connected to
 * @returns {any}
*/

module.exports = (username, timeLeft, roomId, context, callback) => {
    let user = {
      username: username,
      timeLeft: timeLeft,
      roomId: roomId
    };
  
    let uri = process.env['MONGO_URI'];
  
    try {
      if (cache === null) {
        MongoClient.connect(uri, (error, db) => {
          if (error) {
            console.log(error['errors']);
            return callback(error);
          }
          cache = db;
          createUser(db, user, callback);
        });
      } else {
        createUser(cache, user, callback);
      }
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  };

  const createUser = (db, user, callback) => {
    // noinspection JSAnnotator
  db.collection('users').insertOne(user, (error, result) => {
      if (error) {
        console.log(error);
        return callback(null, error);
      }
      return callback(null, result.insertedId);
    });
    //Update room object to reflect added user
    db.collection('rooms').updateOne({ roomId: user.roomId }, { $set: { $inc: { numberOfUsers: 1} } }, function(err, res) {
        if (err) throw err;
        console.log("Number of connected users updated.");
    });
};