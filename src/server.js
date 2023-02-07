const express = require('express');
const path = require('path');
const server = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const home = require('./routes/home');
const logIn = require('./routes/log-in');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));
server.get('/', home.get);
server.get('/log-in', logIn.get);

module.exports = server;
