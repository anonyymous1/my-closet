require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const SneaksAPI = require('sneaks-api');
const flash = require('connect-flash');
const { Session } = require('express-session');
const SECRET_SESSION = process.env.SECRET_SESSION;
const app = express();
const sneaks = new SneaksAPI();
const multer = require('multer')
const cloudinary = require('cloudinary')
const methodOverride = require('method-override');

const uploads = multer({dest: './uploads'})

//Routers
const mycloset = require('./routes/mycloset')
const browse = require('./routes/browse')

//isLoggedIn middleware
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride('_method'));


//secret: What we actulaly giveing the user on our site as a session cookie
//resave: saves the session even if its modified, make this false from start
//saveUninitlaized: if we have a new session, we save it, and therefore making that true.
const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}

app.use(session(sessionObject));

//Initialize passport and run through middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Flash
// message that will be accessible to every view
app.use((req, res, next)=> {
  // before every route, we will attach a user to res.local
  console.log(req.flash);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})

app.get('/', (req, res) => {
  console.log('RESLOCALALERTS', res.locals.alerts);
  res.render('index', { alerts: res.locals.alerts});
});

app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

app.post('/profile/post', uploads.single('inputFile'), (req, res) => {
  const currentUser = res.locals.currentUser
  const alerts = res.locals.alerts
  let file = req.file.path;
  cloudinary.uploader.upload(file, (result) => {
    console.log(result.url);
    db.user.update({
      imageUrl: result.url},
      {returning: true, where: {id: currentUser.id}
    })
    .then(function([ rowsUpdate, [updateduser] ]) {
      res.render('profile')
    })
  })
})

app.get('/update', isLoggedIn, (req, res) => {
  const currentUser = res.locals.currentUser
  const alerts = res.locals.alerts
  res.render('profileEdit',{ currentUser, alerts });
});

app.put('/update', isLoggedIn, (req, res) => {
  const currentUser = res.locals.currentUser
  const alerts = res.locals.alerts
  // console.log(currentUser.email);
  // console.log(req.body.email);
  db.user.update({
      email: req.body.email
  }, {
      where: { id: currentUser.id }
  }).then(() => {
      res.redirect('/profile')
  })
})

app.use('/auth', require('./routes/auth'));

app.use('/mycloset', mycloset)
app.use('/browse', browse)

const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, () => {
  console.log(`You're looking for sneakers on port ${PORT} 👟`);
});

module.exports = server;
