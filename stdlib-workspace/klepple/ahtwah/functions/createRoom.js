const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let cache = null;

/**
 * API so a new user can create a room
 * @returns {string} roomId - the four letter code that identifies a room
*/

module.exports = (context, callback) => {
    let roomId = context.params.roomId || '';
    let numberOfUsers = 1;
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
          createTodo(db, user, callback);
        });
      } else {
        createTodo(cache, user, callback);
      }
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  };
  
  const createUser = (db, user, callback) => {
    db.collection('users').insertOne(user, (error, result) => {
      if (error) {
        console.log(error);
        return callback(null, error);
      }
      return callback(null, result.insertedId);
    });
  };

  function generateRoomId(){

  }