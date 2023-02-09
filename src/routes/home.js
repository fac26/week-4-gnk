const { html } = require('../templates/html');
const { navbar } = require('../templates/nav');
const { eventsTemplate } = require('../templates/events');

const dbEventsHandler = require('../model/event');

function get(req, res) {
  const isAuth = Boolean(req.session);
  const title = 'Social ';
  const navBar = navbar(isAuth);
  const events = dbEventsHandler.listEvents();
  const content = eventsTemplate(events, req.user?.id);
  res.send(html(title, navBar, content));
}

module.exports = { get };
