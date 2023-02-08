const { html } = require('../templates/html');
const { navbar } = require('../templates/nav');
const { eventsTemplate } = require('../templates/events');

const eventsFromDB = require('../model/event');

function get(req, res) {
  const isAuth = req.session ? req.session.id : '';
  const title = 'Social ';
  const navBar = navbar(isAuth);
  const events = eventsFromDB.listEvents();
  const content = eventsTemplate(events);
  res.send(html(title, navBar, content));
}

module.exports = { get };
