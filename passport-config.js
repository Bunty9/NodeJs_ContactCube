// GNU GENERAL PUBLIC LICENSE
// Version 3, 29 June 2007

// Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
// Everyone is permitted to copy and distribute verbatim copies
// of this license document, but changing it is not allowed.

//      Preamble

// The GNU General Public License is a free, copyleft license for
// software and other kinds of works.



const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const User = require('./models/user_model')

function initialize(){
const authenticateUser = async function(email, password, done) {
      const user = await User.findOne({ email: email })
      
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)       
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      } catch (e) {
        return done(e)
      };
  };
passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
}

module.exports = initialize