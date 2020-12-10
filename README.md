# Clone Google Keep

> Clone google keep application using react as a web app.<br>
> Google keep is a note-taking service.

By developing this app, I focused on react and functional component. I tried to understand an ecosystem and optimize its performance. I also tried to write clean code and logic.

<br>

## Live demo

You can check demo [here](https://clone-google-keep.netlify.app).

<br>

## Preview

![google-keep-clone](https://user-images.githubusercontent.com/55128990/94229615-fe6d8d80-ff3a-11ea-93f9-3ae250be241e.gif)

<br>

## 💫 Features

- Custom note (color, pin, archive, label, todo list)
- CRUD of note and label
- filtering of note.
- Social login (email, google, github)

<br>

## Tech and libraries

- React (create-react-app)
- Redux
- Redux-thunk
- Firebase

- material-ui
- Styled-components
- react-masonry-css
- react-transition-group

<br>

## Getting started

### Prerequisites

- Firebase Account
- Your own firebase API

<br>

### Firebase Setup

- Create a project(web) and a clouse firestore.
- Setup Sign-in method by enabling email/password, google, and github in Authentication tab.

### Install

- Add the following env variables to .env file

```
REACT_APP_API_KEY={apiKey}
REACT_APP_AUTH_DOMAIN={authDomain}
REACT_APP_DATABASE_URL={databaseUrl}
REACT_APP_PROJECT_ID={projectId}
REACT_APP_STORAGE_BUCKET={storageBucketURL}
REACT_APP_MESSAGING_SENDER_ID={messagingSenderId}
REACT_APP_APP_ID={appId}
```

Make sure to add "REACT*APP*" before variables if you use create-react-app.

- Install npm packages

```bash
npm install
```

- Start dev server

```bash
npm start
```

<br>

## Note

if you encounter an error which opens new tab for login instead of login popup when using `firebase.auth().signInWithPopup()` in Chrome, it seems chrome bug. check it out [here](https://github.com/firebase/firebase-js-sdk/issues/63).

<br>

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/suyeonme/google-keep-clone/blob/e501a45b719258c1a1e2de9ac9ddb2233b9d8d88/LICENSE.md) for details

<br>

---

## Todo

- Save "isDone" property of a todo item in order to save checked value of a checkbox.
- Update label from all notes when edit a global label

## Improvements

- Optimize rendering.
- Draggable Label
- Implement typescript

## Issues

- Flickering when click pin icon on an editable note.
