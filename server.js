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

//Routers
const mycloset = require('./routes/mycloset')
const browse = require('./routes/browse')

//isLoggedIn middleware
const isLoggedIn = require('./middleware/isLoggedIn')

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use('/mycloset', mycloset)
app.use('/browse', browse)

//secret: What we actulaly giveing the user on our site as a session cookie
//resave: saves the session even if its modified, make this flase from start
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
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})

app.get('/', (req, res) => {
  console.log(res.locals.alerts);
  res.render('index', { alerts: res.locals.alerts});
});

app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});


// sneaks.getProducts("converse", function(err, products){
//   // console.log(products)
// })

// sneaks.getProductPrices("FY2903", function(err, product){
//   // console.log(product)
// })



app.use('/auth', require('./routes/auth'));


const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, () => {
  console.log(`You're looking for sneakers on port ${PORT} 👟`);
});

module.exports = server;
