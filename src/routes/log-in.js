const { userForm } = require('../templates/forms');
const { html } = require('../templates/html');
const { navbar } = require('../templates/nav');
const bcrypt = require('bcryptjs');
const { getUserByEmail } = require('../model/user');
const { createSession } = require('../model/session');
const { sanitize } = require('../helper/helper');

// add social auth
const dotnev = require('dotenv');
dotnev.config();
const client_id = process.env.CLIENT_ID;
const LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${client_id}`;

function get(request, response) {
  const title = 'Social Agenda | Log-in';
  const formTitle = 'Log in';
  const isAuth = Boolean(request.session);
  if (isAuth) {
    return response.redirect('/');
  }
  const navBar = navbar(isAuth); // isAuth should be implemented
  const content = userForm('/log-in', formTitle);
  const socialAuthBtn = `<button class="social-btn"><a href=${LOGIN_URL}>Log in with GitHub</a></button>`;
  response.send(html(title, navBar, content.concat(socialAuthBtn)));
}

function post(request, response) {
  const isAuth = Boolean(request.session);
  const { email, password } = request.body;
  const user = getUserByEmail(sanitize(email));

  const errLayout = {
    title: 'Social Agenda | Log-in',
    navBar: navbar(isAuth),
    content: userForm('/log-in', 'Login failed!'),
  };
  if (!email || !password || !user) {
    return response
      .status(400)
      .send(html(errLayout.title, errLayout.navBar, errLayout.content));
  }
  bcrypt.compare(sanitize(password), user.hash).then((match) => {
    if (!match) {
      return response
        .status(400)
        .send(html(errLayout.title, errLayout.navBar, errLayout.content));
    } else {
      const session_id = createSession(user.id);
      response.cookie('sid', session_id, {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        sameSite: 'lax',
        httpOnly: true,
      });
      response.redirect(`/`);
    }
  });
}

module.exports = { get, post };
