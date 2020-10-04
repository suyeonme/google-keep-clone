# Clone Google Keep

> Clone google keep application using react as a web app.<br>
> Google keep is a note-taking service.

By developing this app, I focused on react and functional component. I tried to understand an ecosystem of react and optimize its performance, especially reducing unnecessary re-rendering. I also tried to write clean code and logic as much as I could (but I think it was messy in a way 😂).

<br>

## Live demo

You can check demo [here](https://clone-google-keep.netlify.app).

<br>

## Preview

![google-keep-clone](https://user-images.githubusercontent.com/55128990/94229615-fe6d8d80-ff3a-11ea-93f9-3ae250be241e.gif)

<br>

## 💫 Features

- Manage your custom note (color, pin, etc)
- Todo list
- Add, delete, and edit label
- Login (email, google, github)
- Archive note

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
- uniqid
- prop-types

<br>

## Getting started

### Prerequisites

- Firebase Account
- Your own firebase API

<br>

### Install

- Firebase setup
- Add the following env variables to .env file

```
REACT_APP_FIREBASE_API_KEY={apiKey}

REACT_APP_FIREBASE_AUTH_DOMAIN={authDomain}

REACT_APP_FIREBASE_DATABASE_URL={databaseUrl}

REACT_APP_FIREBASE_PROJECT_ID={projectId}

REACT_APP_FIREBASE_STORAGE_BUCKET={storageBucketURL}

REACT_APP_FIREBASE_MESSAGING_SENDER_ID={messagingSenderId}

REACT_APP_FIREBASE_APP_ID={appId}
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

## Author

Suyeon Kange - [Github](https://github.com/suyeonme).

<br>

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/suyeonme/google-keep-clone/blob/e501a45b719258c1a1e2de9ac9ddb2233b9d8d88/LICENSE.md) for details

<br>

---

## Todo

- Implement CRUD of Edit label component (global label).
- Delete and update label from all notes having them when delete or update a global label from store.
- Save "isDone" property of a todo item component in order to save checked value of a checkbox.
- Implement each label page(also route).

## Improvements

- Optimize rendering.
- Custom checkbox.
- Add functionality dragging a label.
- Add functionality filtering specific notes.

## Issues

- Flickering when click pin icon on an editable note.
