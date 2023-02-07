const { navbar } = require('../templates/nav');
const { forms } = require('../templates/forms');
// bcrypt
// model/session
// model/user
// any other html

function get(request, response) {
  const title = 'Social Agenda | Create an Account';
  const content = /*html*/;
  response.send(); //forms;
}

function post(request, response) {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400).send('<h1>Please choose a valid combination</h1>')
  } else {
    bcrypt.hash(password, 12).then((hash) => {
      const user = createUser(username, hash);
      const session_id = createSession(user.id);
      response.cookie('sid', session_id, {
        signed: true, 
        httpOnly: true, 
        maxAge: 1000 * 60 * 60 * 24, // one day
        sameSite: 'lax',
      });
      response.redirect('/');
    })
  }
}

module.exports = { get, post };