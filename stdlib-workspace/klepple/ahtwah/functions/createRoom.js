const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const _ = require('lodash');

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
        MongoClient.connect(uri, (error, client) => {
          let db = client.db('ahtwahdb');
          if (error) {
            console.log(error['errors']);
            return callback(error);
          }
          createRoom(db, room, (err, result) => {
              if (err) {
                  return callback(err);
              }
              createUser(db, user, callback);
          });
        });
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  };
  
  const createRoom = (db, room, callback) => {
    db.collection('rooms').insertOne(room, (error, result) => {
      if (error) {
        console.log(error);
        return callback(error);
      }
      let formattedResult = JSON.parse(JSON.stringify(result));
      return callback(null, formattedResult);
    });
  };
  
  const createUser = (db, user, callback) => {
    //Update room object to reflect added user
    db.collection('rooms').updateOne({ roomId: user.roomId }, { $inc: { numberOfUsers: 1} }, function(err, res) {
        if (err) throw err;
        console.log("Number of connected users updated.");
    });
    //Add user to the list of connected users
    db.collection('rooms').updateOne({ roomId: user.roomId }, { $addToSet: { listOfConnectedUsers: user.username } }, function(err, res) {
        if (err) throw err;
        console.log("User added to the list of connected users");
    });
    db.collection('users').insertOne(user, (error, result) => {
        if (error) {
          console.log(error);
          return callback(null, error);
        }
        let formattedResult = '{ "roomId": "' + user.roomId + '"}';
        return callback(null, JSON.parse(formattedResult));
      });
  };

  //Function to generate a random 4-letter id for the room
  function generateRoomId(){
    let roomId = "";
    for(let i = 0; i < 4; i++){
      roomId += String.fromCharCode(_.random(65,90));
    }
    return roomId;
  }