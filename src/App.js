import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { authService } from 'fbase';

// import CircularProgress from '@material-ui/core/CircularProgress';
import Auth from 'containers/Auth/Auth';
import Home from 'pages/Home';
import Layout from 'components/Layout/Layout';

import PageLoader from 'components/UI/PageLoader/PageLoader';

const ArchivedNote = lazy(() => import('./pages/ArchivedNote'));
// const PageLoader = () => <CircularProgress color="#F3B501" />;

// Implement auth
// Save notes in firestore
// Save image and canvas in storage(firebase)
// filter
// Display label
// photoUrl (Display social image)

// Log out

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  // const refreshUser = () => {
  //   const user = authService.currentUser;
  //   setUserObj({
  //     displayName: user.displayName,
  //     uid: user.uid,
  //     updateProfile: args => user.updateProfile(args),
  //   });
  // };

  let routes;

  if (userObj) {
    routes = (
      <>
        <Route path="/" exact component={Home} />
        <Route path="/archive" component={ArchivedNote} />
      </>
    );
  }

  if (!userObj) {
    routes = <Route path="/" exact component={Auth} />;
  }

  return (
    <div className="App">
      {init ? (
        <Layout isLoggedIn={userObj}>
          <Suspense fallback={PageLoader()}>
            <Switch>{routes}</Switch>
          </Suspense>
        </Layout>
      ) : (
        <PageLoader />
      )}
    </div>
  );
}

export default App;
