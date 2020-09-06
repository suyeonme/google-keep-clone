import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import ArchivedNote from './pages/ArchivedNote';

import Home from './pages/Home';

// If authenticated or not

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />

      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/archive" component={ArchivedNote} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
