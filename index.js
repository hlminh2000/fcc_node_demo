const PORT = process.env.PORT || 4000
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const databaseService = require('./data/fsDatabaseService.js') // this uses the file system as the database
const databaseService = require('./data/firebaseService.js')  // this uses Firebase as the database

const app = express()


// lots of middleware!
app.use(require('cookie-parser')());
app.use(require('express-session')({
  secret: 'dragons!!!!',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// authentication model
passport.use(new LocalStrategy(
  function(username, password, done) {
    databaseService.getUserByUsername(username)
    .then(function (user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
))
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});


// the authentication implementation
app.use('/', express.static('view/public'))
app.use('/app', (req, res, next) => {
  if(req.user){
    next()
  } else {
    res.redirect('/')
  }
}, express.static('view/app'))


// API
app.post('/login', (req, res, next) => {
  next()
}, passport.authenticate('local', {
  successRedirect: '/app',
  failureRedirect: '/',
  failureFlash: false
}))

app.get('/dragons', (req, res) => {
  databaseService.getAllDragons()
    .then((dragons) => {
      res.send({
        dragons: dragons
      })
    })
})

app.post('/dragons', (req, res) => {
  const dragonToAdd = req.body.dragon
  databaseService.addDragon(dragonToAdd)
    .then((dragons) => {
      res.send({
        dragons: dragons
      })
    })
})

app.post('/dragons/delete', (req, res) => {
  const dragonId = req.body.dragonId
  console.log(dragonId);
  databaseService.removeDragon(dragonId)
    .then((dragons) => {
      res.send({
        dragons: dragons
      })
    })
})

app.post('/dragons/update', (req, res) => {
  const newDragonData = req.body.dragonData
  databaseService.updateDragon(newDragonData)
    .then((dragons) => {
      res.send({
        dragons: dragons
      })
    })
})


app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT)
})
