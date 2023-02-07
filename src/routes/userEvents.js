const { addEventForm } = require('../templates/forms');
const { html } = require('../templates/html');
const { navbar } = require('../templates/nav');

const dbEventsHandler = require('../model/event');

function addEvent(req, res) {
  const title = 'Add event';
  const navBar = navbar(true); // isAuth should be implemented
  const content = addEventForm();

  res.send(html(title, navBar, content));
}

function postEvent(req, res) {
  console.log(req.session);
  const { title, content, date, address } = req.body;
  const userId = req.session.user_id;
  dbEventsHandler.createEvent(title, content, date, address, userId); //1 will be session user id

  res.redirect('/');
}

module.exports = { addEvent, postEvent };
