import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { authService } from 'fbase';

import Auth from 'containers/Auth/Auth';
import Home from 'pages/Home';
import Layout from 'components/Layout/Layout';
import PageLoader from 'components/UI/PageLoader/PageLoader';

const ArchivedNote = lazy(() => import('./pages/ArchivedNote'));
const LabelPage = lazy(() => import('./pages/LabelPage'));

export interface UserObj {
  displayName: string | null;
  img: string | null;
  email: string | null;
  uid?: string;
  updateProfile?: ((args: any | null) => void) | undefined;
}
export type UserObjType = UserObj | null;

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<UserObjType>(null);
  let routes;

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          img: user.photoURL,
          email: user.email,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        // When user signout
        setUserObj(null);
      }
      setInit(true);
    });
    return () => unsubscribe();
  }, []);

  if (userObj) {
    routes = (
      <>
        <Route path="/" exact component={Home} />
        <Route path="/archive" component={ArchivedNote} />
        <Route path="/label/:labelName" component={LabelPage} />
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
