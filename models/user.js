const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// user schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
},
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  locations: {
    type: [String]
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

/*
 * DELETE all users from collection
 */
module.exports.deleteUsers = function (callback) {
  User.remove({}, function(err) { 
    callback();
  });
}


module.exports.addLocation = function (userid, newlocation, callback) {
  User.findByIdAndUpdate(
    userid,
    { $push: {"locations": newlocation}},
    { new: true, upsert: true},
    function(err, model) {
      if(err) throw err;
      callback(null, model);
    }
  );
};

module.exports.removeLocation = function (userid, location, callback) {

  User.findByIdAndUpdate(
    userid,
    { $pull: {"locations": location}},
    { new: true, upsert: true},
    function(err, model) {
      if(err) throw err;
      callback(null, model);
    }
  );
};

module.exports.removeAllLocations = function (userid, callback) {
  User.update(
    { _id: userid }, 
    { $set: { locations: [] }}, 
    function(err, model) {
      if(err) throw err;
      callback(null, model);
    }
  );
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
};