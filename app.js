var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connection to DB succeeded'));

var Costume = require('./models/costume');
async function recreateDB() {
  await Costume.deleteMany();

  const items = [
    { costume_type: 'Ghost',   size: 'Large',  cost: 15.4 },
    { costume_type: 'Witch',   size: 'Medium', cost: 22.0 },
    { costume_type: 'Vampire', size: 'Small',  cost: 18.9 }
  ];

  for (let i of items) {
    let doc = new Costume(i);
    await doc.save();
    console.log(`Saved: ${doc.costume_type}`);
  }

  console.log("✅ Seeded 3 Costume documents successfully!");
}

const reseed = true;
if (reseed) {
  recreateDB();
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
