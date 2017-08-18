const jwt = require('jwt-simple');
const User = require('../models/user');
config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  //User has already had there email/pass authed, need
  //to give token;
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  //See if a user with given email exists
  //.findOne is a mongoDB method
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    //If user with email does exist, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    //If user with email does NOT exist, create it
    const user = new User({
      email: email,
      password: password
    });

    //Respond to request indicating the user was created
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user) });
    });
  });
};
