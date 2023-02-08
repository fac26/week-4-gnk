const { removeSession } = require('../model/session');

function post(request, response) {
  const sid = request.signedCookies.sid;
  console.log(sid, ' sid ');
  removeSession(sid);
  response.clearCookie('sid');
  response.redirect('/');
}

module.exports = { post };
