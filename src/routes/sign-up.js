const { navbar } = require('../../templates/nav');
const { forms } = require('../../templates/forms');
// bcrypt
// model/session
// model/user
// any other html

function get(request, response) {
  const title = 'Social Agenda | Create an Account';
  const content = /*html*/
  response.send(); //forms
}

function post(request, response) {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400).send('<h1>')
  }
}