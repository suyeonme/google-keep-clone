// Implement auth
// Save notes in firestore
// Save image and canvas in storage(firebase)
// filter
// Display label
// photoUrl (Display social image)

import React, { lazy, Suspense, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Auth from 'containers/Auth/Auth';
import Home from 'pages/Home';
import Layout from 'components/Layout/Layout';

const ArchivedNote = lazy(() => import('./pages/ArchivedNote'));
const PageLoader = () => <CircularProgress color="#F3B501" />;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" exact component={Home} />
        <Route path="/archive" component={ArchivedNote} />
      </>
    );
  }

  if (!isLoggedIn) {
    routes = <Route path="/" exact component={Auth} />;
  }

  return (
    <div className="App">
      <Layout isLoggedIn={isLoggedIn}>
        <Suspense fallback={PageLoader()}>
          <Switch>{routes}</Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
