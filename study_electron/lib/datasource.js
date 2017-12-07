const mongoose = require('mongoose');

var tunnel = require('tunnel-ssh');
var fs = require("fs");
var currentTunnel;
var db;
// var UserEmployee;
// var isLoading = false;


// var connectCollections = function (upper_callback) {
//   UserEmployee    = db.collection('UserEmployee');
//   upper_callback();
// }

//connect tunnel, connect local db
var connectTunnel = function (cb) {
  var config = {
      username: 'ubuntu',
      host: '13.124.153.79',
      port: '22',
      dstPort:'27000',
      agent : process.env.SSH_AUTH_SOCK,      
      privateKey: fs.readFileSync('./lib/cert/whyme.pem')
  };

  currentTunnel = tunnel(config, function (error, server) {
      if(error){
          console.log("SSH connection error: " + error);
      }

      console.log('SSH Connection Success');

      mongoose.connect('mongodb://localhost:27000/whyme');
      var conn = mongoose.connection;
      conn.on('error', console.error.bind(console, 'DB connection error:'));
      conn.once('open', function() {
          db = conn.db;

          console.log("DB connection successful");
          cb();
      });
  });
}

module.exports = {
  connect(cb) {
    connectTunnel(cb)
  }
}