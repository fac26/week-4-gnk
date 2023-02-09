const dbSession = require('../model/session');
const { getUserById } = require('../model/user');

function sessions(req, res, next) {
  const sid = req.signedCookies.sid; //undefined if there is not a sid
  const session = dbSession.getSession(sid); //undefined if there is no session
  if (session) {
    const expiry = new Date(session.expires_at);
    const today = new Date();
    if (expiry < today) {
      dbSession.removeSession(sid);
      res.clearCookie(sid);
    } else {
      const userIdFromDB = getUserById(session.user_id);
      req.user = userIdFromDB;
      req.session = session;
    }
  }
  next();
}

function confirmLogin(req, res, next) {
  const isLoggedIn = req.session;
  if (!isLoggedIn) {
    return res.redirect('/');
  }
  next();
}

module.exports = { sessions, confirmLogin };
