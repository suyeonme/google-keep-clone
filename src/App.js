import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { authService } from 'fbase';

import Auth from 'containers/Auth/Auth';
import Home from 'pages/Home';
import Layout from 'components/Layout/Layout';
import PageLoader from 'components/UI/PageLoader/PageLoader';

const ArchivedNote = lazy(() => import('./pages/ArchivedNote'));
const LabelPage = lazy(() => import('./pages/LabelPage'));

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
          img: user.photoURL,
          email: user.email,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  let routes;

  if (userObj) {
    routes = (
      <>
        <Route path="/" exact component={Home} />
        <Route path="/archive" component={ArchivedNote} />
        <Route path="/label/:labelId" component={LabelPage} />
      </>
    );
  }

  if (!userObj) {
    routes = <Route path="/" exact component={Auth} />;
  }

  return (
    <div className="App">
      {init ? (
        <Layout userObj={userObj}>
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
