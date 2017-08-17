//main starting point of a
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//db setup
mongoose.connect('mongodb://localhost:/auth', {
  useMongoClient: true,
});



//App setup exress setup
//morgan for logging
//bodyparser to turn into json
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
router(app);
//comment

//Server Setup
//if env variable set up, use it or use 3090;
const port = process.env.PORT || 3090;
//http is node lib, create server and pass to our app which
//is express.
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);



