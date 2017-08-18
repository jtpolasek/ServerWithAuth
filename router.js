const Authenication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
//auth using token session: false means don't use cookies
const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res){
    res.send({"hi": "there"});
  })
  app.post('/signin', requireSignin, Authenication.signin);
  app.post('/signup', Authenication.signup);
}