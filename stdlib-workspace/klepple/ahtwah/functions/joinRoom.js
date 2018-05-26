const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

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
        MongoClient.connect(uri, (error, client) => {
          if (error) {
            console.log(error['errors']);
            return callback(error);
          }
          //createUser(client.db('ahtwahdb'), user, callback);
        });
    } catch (error) {
      console.log(error);
      return callback(error);
    }
    
  };

  const createUser = (db, user, callback) => {
    //Update room object to reflect added user
    // db.collection('rooms').updateOne({ roomId: user.roomId }, { $inc: { numberOfUsers: 1} }, function(err, res) {
    //     if (err) throw err;
    //     console.log("Number of connected users updated.");
    // });
    // //Add user to the list of connected users
    // db.collection('rooms').updateOne({ roomId: user.roomId }, { $addToSet: { listOfConnectedUsers: user.username } }, function(err, res) {
    //     if (err) throw err;
    //     console.log("User added to the list of connected users");
    // });
    // db.collection('users').insertOne(user, (error, result) => {
    //     if (error) {
    //       console.log(error);
    //       return callback(null, error);
    //     }
    //     let formattedResult = JSON.parse(JSON.stringify(result.insertedId));
    //     return callback(null, user.roomId);
    //   });
  };
