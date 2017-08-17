const Authenication = require('./controllers/authentication');

module.exports = function(app) {
  app.post('/signup', Authenication.signup);
}