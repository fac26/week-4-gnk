const { userForm } = require('../templates/forms');
const { html } = require('../templates/html');
const { navbar } = require('../templates/nav');
const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../model/user');
const { createSession } = require('../model/session');

// should this have a redirect if already logged in?
function get(request, response) {
  const title = 'Social Agenda | Create an Account';
  const navBar = navbar(false); //isAuth should be implemented
  const content = userForm('/sign-up', 'Create an Account');
  response.send(html(title, navBar, content));
}

function post(request, response) {
  const { email, password } = request.body;
  const errLayout = {
    title: 'Social Agenda | Create an Account',
    navBar: navbar(false),
    content: userForm('/sign-up', 'Please choose a valid combination!'),
  };
  if (!email || !password) {
    return response
      .status(400)
      .send(html(errLayout.title, errLayout.navBar, errLayout.content));
  } else {
    bcrypt.hash(password, 12).then((hash) => {
      const existingUser = getUserByEmail(email);
      if (existingUser) {
        return response
          .status(400)
          .send(html(errLayout.title, errLayout.navBar, errLayout.content));
      }
      const user = createUser(email, hash);
      const session_id = createSession(user.id);
      response.cookie('sid', session_id, {
        signed: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // one day
        sameSite: 'lax',
      });
      response.redirect('/');
    });
  }
}

module.exports = { get, post };
