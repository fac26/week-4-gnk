const express = require('express');
const path = require('path');
const server = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const home = require('./routes/home');
const logIn = require('./routes/log-in');
const { addEvent, postEvent } = require('./routes/userEvents');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser(process.env.COOKIE_SECRET));

server.get('/', home.get);
server.get('/log-in', logIn.get);

server.get('/add-event', addEvent); //add middleware
server.post('/add-event', postEvent); //add middleware

module.exports = server;
