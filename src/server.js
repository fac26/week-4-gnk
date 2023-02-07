const express = require("express");
const server = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const home = require("./routes/home");

server.use(bodyParser.urlencoded({ extended: false }));
server.get("/", home.get);

module.exports = server;
