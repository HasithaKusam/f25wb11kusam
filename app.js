var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log("Connection to DB succeeded"));

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

  console.log("Seeded 3 Costume documents!");
}

const reseed = false;
if (reseed) { recreateDB(); }

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const costumesRouter = require('./routes/costumes');

const resourceRouter = require('./routes/resource');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/resource', resourceRouter);

app.use('/costumes', costumesRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
var Account = require('./models/account');

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(function(req, res, next) {
  next(createError(404));
});
passport.use(new LocalStrategy(
  function(username, password, done) {

    Account.findOne({ username: username })
      .then(function (user) {

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        user.authenticate(password, function(err, result) {
          if (err) {
            return done(err);
          }
          if (!result.user) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });

      })
      .catch(function(err){
        return done(err);
      });

  }
));

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
