"use strict";



const model = require('./model');


const express = require('express');
const express_mu = require('mustache-express');
const app = express();

app.use(express.static('public'));

const mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


const cookieSession = require('cookie-session');

app.use(cookieSession({
  secret: ';l2$knjkgkn3t24iohq;w,g,ea',
  // session cookie will expire after 24 hours
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  // only send our cookie when connecting to our site
  sameSite: 'strict'
  // other cookies options can be set here
  // see : http://expressjs.com/en/resources/middleware/cookie-session.html
  // for the full documentation, including default parameter values
}));


// setup session id generator
// the following provides unique and hard to predict session ids
let crypto = require('crypto');
let generate_key = function() {
  return crypto.randomBytes(64).toString('base64');
};

// use middleware on all routes to create unique and unpredictable session id
// at first connection
app.use(function(req, res, next) {
  if (req.session.id === undefined) {
    req.session.id = generate_key();
  }
  return next();
});


app.get('/', (req, res) => {
  res.render('index');
})

app.get('/cnx', (req,res) => {
  res.render('cnx');
})

app.get('/insc', (req,res) => {
  res.render('insc');
})


function is_authenticated(req, res, next) {
  if (req.session.id != undefined){
    next();
  } else{
    res.status(401).send('Authentification Required !');
  }
}

app.post('/cnx', (req, res) => {
  if(model.login(req.body.email, req.body.mdp) != -1){
    req.session.id = model.login(req.body.email, req.body.mdp);
    req.session.nom = req.body.nom;
    res.render('afcnx')
  }else{res.redirect('/cnx');}
  
});



app.get('/logout', (req, res) => {
  req.session= null;
  res.redirect('/');
});

app.get('/insc', (req, res) => {
  res.render('insc');
});

app.get('/rech', (req, res) => {
  res.render('rech');
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/afcnx', (req, res) => {
  res.render('afcnx');
});

app.post('/insc', (req, res) => {
  req.session.id = model.new_user(req.body.nom, req.body.prenom, req.body.email, req.body.mdp);
  if(req.session.id != -1){
  req.session.nom = req.body.nom;
  res.redirect('/');
  }
});


app.post('/new_help', (req, res) => {
  req.session.id = model.new_help(req.body.email, req.body.message);
  if(req.session.id != -1){
  
  res.redirect('/');
  }
});

app.listen(7050, () => console.log('listening on http://localhost:7050'));