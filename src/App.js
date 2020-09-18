import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import ArchivedNote from './pages/ArchivedNote';
import Layout from './components/Layout/Layout';

// If authenticated or not

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/archive" component={ArchivedNote} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
