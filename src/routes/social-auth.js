const api = require('../api');

function socialAuth(req, res) {
  console.log('socialAuth');
  const code = req.query.code;
  console.log(code);
  api
    .getToken(code)
    .then(api.getUser)
    .then((user) => {
      // probably create a new user in your own DB here
      // do some proper session cookie stuff etc
      // this is just an over-simplified example
      // so we just stick the username into the cookie
      res.cookie('user', user.login, {
        httpOnly: true,
        signed: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: 'lax',
      });
      res.redirect('/');
    });
}

module.exports = { socialAuth };
