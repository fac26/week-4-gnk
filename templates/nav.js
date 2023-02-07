function navbar(isAuth) {
  return /*html*/ `
  <nav>
        <ul class="main-nav">
            <li>Home</li>
        </ul>
        <ul class="auth-nav">
        if (!isAuth) {
            <li><a href='/log-in'>Log in</a></li>
            <li><a href='/sign-up'>Sign up</a></li>
        } else {
          <li><a href='/log-out'>Log out</a></li>
        }
        </ul>
    </nav>
  `;
}

module.exports = { navbar };