const { addEventForm } = require('../templates/forms');
const { html } = require('../templates/html');
const { navbar } = require('../templates/nav');
const { sanitize } = require('../helper/helper');

const dbEventsHandler = require('../model/event');

function addEvent(req, res) {
  const title = 'Add event';
  const navBar = navbar(true); // isAuth should be implemented
  const content = addEventForm();

  res.send(html(title, navBar, content));
}

function postEvent(req, res) {
  const { title, content, date, address } = req.body;
  const userId = req.session.user_id;
  dbEventsHandler.createEvent(
    sanitize(title),
    sanitize(content),
    sanitize(date),
    sanitize(address),
    userId
  );

  res.redirect('/');
}

function deleteEvent(req, res) {
  const incomeEventId = req.params.id;
  const eventFromDB = dbEventsHandler.getEventByID(incomeEventId);
  if (req.user.id === eventFromDB.user_id) {
    dbEventsHandler.deleteEventFromDB(incomeEventId);
  }
  res.redirect('/');
}
module.exports = { addEvent, postEvent, deleteEvent };
