const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// set database
let db = config.database;
db = (process.env.NODE_ENV === 'test') ? config.testdatabase : config.database;

// connect to database
mongoose.connect(db);

// on connection
mongoose.connection.on('connected', () => {
  console.log('connected to database ' + db);
});

// on error
mongoose.connection.on('error', (err) => {
  console.log('database error ' + err);
});

const app = express();

const users = require('./routes/users');

// Port number
const port = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index route, link to angular app
app.get('/', (req, res) => {
  res.send("Invalid endpoint");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start server
app.listen(port, () => {
  console.log("Server started on port " + port);
});


