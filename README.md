# Project Title: Social Agenda 🥳

## a Node/Express server-rendered application with a SQLite database

Social Agenda is a web app that allows users to post their events. 💃

#### Technical Requirements

- [x] Express server
- [x] Modular codebase
- [x] SQLite database
- [x] Hosted on Fly.io
- [x] Social Login (OAuth) using a 3rd party account: Github
- [x] Server-side validation of user-submitted data
- [x] Error handling and informative error messages for the user
- [x] Styled for a professional user-experience

#### User Stories

1. As a user, I want to be able to sign up for the application using my GitHub account.
2. As a user, I want to be able to log into the application using GitHub account.
3. As a user, I want to be able to submit data to the application, and have it validated on the server-side.
4. As a user, I want to receive informative error messages if my data submission is invalid.
5. As a user, I want to have a professional and visually appealing user-interface when using the application.

#### Deployment

This application is hosted on Fly.io and can be accessed [here](https://fly.io/apps/frosty-sky-4626).

#### Running the project locally

1. `npm install`
2. `run npm dev` (GitHub OAuth will only work on the deployed site)
3. You'll be able to add events when logged in using the site's log-in feature (not yet under gitHub OAuth).
4. The `/add-event` route is not yet protected and can be accessed by all.

#### OAuth Notes

OAuth is currently under construction and does not yet display the 'Add Event' panel, despite being logged-in via OAuth withg GitHub.
_OAuth will only work on the deployed site_

#### Contributing

If you would like to contribute to this project, please reach out to the Contributors : Georgia, Natalia, Konstantina (fac26 cohort).

#### License

This project is licensed under Apache 2.0.
