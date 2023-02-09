const { addEventForm } = require('../templates/forms');
const { html } = require('../templates/html');
const { navbar } = require('../templates/nav');
const { validationResult } = require('express-validator');

const dbEventsHandler = require('../model/event');

function addEvent(req, res) {
  const title = 'Add event';
  const navBar = navbar(true); // isAuth should be implemented
  const content = addEventForm();

  res.send(html(title, navBar, content));
}

function postEvent(req, res, next) {
  console.log(req.session);
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    //return an error response with the validation errors
  return res.status(400).json({ errors: errors.array() });
  }
  const { title, content, date, address } = req.body;
  dbEventsHandler.addEvent(title, content, date, address)
    .then((event) => {
      res.status(200).json({ message: 'Event added successfully', event });
    })
    .catch((err) => {
      next(err);
    });

}

module.exports = { addEvent, postEvent };
