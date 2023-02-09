const express = require('express');
const path = require('path');
const server = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const home = require('./routes/home');
const logIn = require('./routes/log-in');
const event = require('./routes/events');

const signUp = require('./routes/sign-up');
const logOut = require('./routes/log-out');
const { sessions, confirmLogin } = require('./middleware/session');

const { socialAuth } = require('./routes/social-auth');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(sessions);

server.get('/', home.get);
server.get('/log-in', logIn.get);
server.post('/log-in', logIn.post);
server.get('/sign-up', signUp.get);
server.post('/sign-up', signUp.post);
server.post('/log-out', logOut.post);

server.get('/add-event', confirmLogin, event.addEvent); //add middleware
server.post('/add-event', event.postEvent); //add middleware

server.get('/auth', socialAuth);
server.post('/delete/:id', event.deleteEvent);

module.exports = server;
