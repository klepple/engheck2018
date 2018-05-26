const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let cache = null;

/**
 * API so a new user can join the room
 * @returns {any}
*/

module.exports = (context, callback) => {
    let username = context.params.username || '';
    let timeLeft = context.params.timeLeft || 10;
    let roomId = context.params.roomId;
    let user = {
      username: username,
      timeLeft: timeLeft
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
    db.collection('rooms').updateOne({ roomId:roomId }, { $set: { $inc: { numberOfUsers: 1} } }, function(err, res) {
        if (err) throw err;
        console.log("Number of connected users updated.");
      });
  };