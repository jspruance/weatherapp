const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    locations: []
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});

// authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if(!user) {
        return res.json({success: false, msg:'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true, 
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            locations: user.locations
          }
        });
      }else {
        return res.json({success: false, msg:'Password does not match'});  
      }
    })
  });
});

// profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({ user: req.user});
});

// add location
router.post('/addlocation', (req, res, next) => {
  
  const userid = req.body.userid;
  const newlocation = req.body.location;

  User.addLocation(userid, newlocation, (err, model) => {
    if (err) {
      res.json({success: false, msg: err});
    } else {
      res.json({success: true, model: model});
    }
  });

});

// remove location
router.post('/removelocation', (req, res, next) => {
  
  const userid = req.body.userid;
  const location = req.body.location;

  User.removeLocation(userid, location, (err, model) => {
    if (err) {
      res.json({success: false, msg: err});
    } else {
      res.json({success: true, model: model});
    }
  });

});

// remove all locations
router.post('/removealllocations', (req, res, next) => {
  
  const userid = req.body.userid;

  User.removeAllLocations(userid, (err) => {
    if (err) {
      res.json({success: false, msg: err});
    } else {
      res.json({success: true});
    }
  });

});

router.get('/remove', (req, res, next) => {
  User.deleteUsers(() => {
    console.log('users removed');
  });
});

module.exports = router;