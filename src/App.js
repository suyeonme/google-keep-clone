import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Home from './pages/Home';
import Layout from './components/Layout/Layout';

const ArchivedNote = lazy(() => import('./pages/ArchivedNote'));
const PageLoader = () => <CircularProgress color="#F3B501" />;

function App() {
  return (
    <div className="App">
      <Layout>
        <Suspense fallback={PageLoader()}>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/archive" component={ArchivedNote} />
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
