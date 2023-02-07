const { navbar } = require('../../templates/nav');
const { forms } = require('../../templates/forms');
// bcrypt
// model/session
// model/user
// any other html

function get(request, response) {
  const title = 'Social Agenda | Log-in';
  const content = response.send(); // forms
}

function post(request, response) {
  const { email, password } = request.body;
  const user = getUserByEmail(email);
  if (!email || !password || !user) {
    return response.status(400).send('<h1>Login Failed</h1>');
  } else {
    const session_id = createSession(user.id);
    response.cookie('sid', session_id, {
      signed: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, //one day
      sameSite: 'lax',
    });
    // confirm redirect path
    response.redirect('/');
  }
}

module.exports = {get, post};