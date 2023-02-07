const { addEventForm } = require('../templates/forms');
const { html } = require('../templates/html');
const { navbar } = require('../templates/nav');

const dbEventsHandler = require('../model/event');
const { createUser } = require('../model/user');

function addEvent(req, res) {
  const title = 'Add event';
  const navBar = navbar(true); // isAuth should be implemented
  const content = addEventForm();

  res.send(html(title, navBar, content));
}

function postEvent(req, res) {
  const { title, content, date, address } = req.body;
  //
  createUser('nn@test.com', '1234');
  //
  dbEventsHandler.createEvent(title, content, date, address, 1); //1 will be session user id

  res.redirect('/');
}

module.exports = { addEvent, postEvent };
