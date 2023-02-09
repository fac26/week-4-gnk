const express = require('express');
const path = require('path');
const server = express();


const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const home = require('./routes/home');
const logIn = require('./routes/log-in');
const { addEvent, postEvent } = require('./routes/userEvents');

const signUp = require('./routes/sign-up');
const logOut = require('./routes/log-out');

const { getSession, removeSession } = require('./model/session');
const { socialAuth } = require('./routes/social-auth');
const { check, validationResult } = require('express-validator');




server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(sessions);

server.get('/', home.get);
server.get('/log-in', logIn.get);
server.post('/log-in', logIn.post);
server.get('/sign-up', signUp.get);
server.post(
  '/sign-up',
  [
    check('email', 'Please enter a VValid email address').isEmail(),
    check('password', 'Password must be AAat least 8 characters long').isLength({ min: 8 })
  ],
  signUp.post
);

server.post('/log-out', logOut.post);

//
server.get('/add-event', addEvent); // middleware 
server.post(
  '/add-event',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty()
  ],
  postEvent
);

server.get('/auth', socialAuth); 
server.post('/auth', socialAuth);

function sessions(req, res, next) {
  const sid = req.signedCookies.sid; //undefined if there is not a sid
  const session = getSession(sid); //undefined if there is no session
  if (session) {
    const expiry = new Date(session.expires_at);
    const today = new Date();
    if (expiry < today) {
      removeSession(sid);
      res.clearCookie('sid');
    } else {
      req.session = session;
    }
  }
  next();
}

function confirmLogin(req, res, next) {
  const isLoggedIn = req.session;
  if (isLoggedIn) {
    return res.redirect('/');
  }
  next();
} 
module.exports = {server, validationResult, sessions, confirmLogin};
