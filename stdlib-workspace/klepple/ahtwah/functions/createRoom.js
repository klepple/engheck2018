const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
import _ from lodash;

let cache = null;

/**
 * API so a new user can create a room
 * @param {string} username the username
 * @param {number} totalTime the time that each user gets as they enter the room
 * @returns {any} roomId - the four letter code that identifies a room
*/

module.exports = (username, totalTime, context, callback) => {
    let roomId = generateRoomId();
    let room = {
      roomId: roomId,
      numberOfUsers: 0,
      totalTime: totalTime,
      listOfConnectedUsers: [],
      isPersonCountingDown: ''
    };
    let user = {
        username: username,
        timeLeft: totalTime,
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
          createRoom(db, room, (err, result) => {
              if (err) {
                  return callback(err);
              }
              createUser(db, user, callback);
          });
        });
      } else {
        createRoom(db, room, (err, result) => {
            if (err) {
                return callback(err);
            }
            createUser(db, user, callback);
        });
      }
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  };
  
  const createRoom = (db, room, callback) => {
    db.collection('rooms').insertOne(room, (error, result) => {
      if (error) {
        console.log(error);
        return callback(null, error);
      }
      return callback(null, result.roomId);
    });
  };
  
  const createUser = (db, user, callback) => {
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

  function generateRoomId(){
    let roomId = "";
    for(let i = 0; i < 4; i++){
      roomId += String.fromCharCode(_.random(65,90));
    }
    return roomId;
  }