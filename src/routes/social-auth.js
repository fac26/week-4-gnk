const bcrypt = require('bcryptjs');
const api = require('../api');
const { createSession } = require('../model/session');
const { getUserByEmail, createUser } = require('../model/user');

function socialAuth(req, res) {
  const code = req.query.code;

  api
    .getToken(code)
    .then(api.getUser)
    .then((user) => {
      const userName = user.login; //gitves the name of user from gitHub
      console.log(userName);
      bcrypt.hash(code, 12).then((hash) => {
        const existingUser = getUserByEmail(userName);
        let userId = existingUser?.id || createUser(userName, hash).id;
        const session_id = createSession(userId);
        res.cookie('sid', session_id, {
          signed: true,
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24, // one day
          sameSite: 'lax',
        });
        res.redirect('/');
      });
    });
}

module.exports = { socialAuth };
