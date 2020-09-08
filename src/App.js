import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ArchivedNote from './pages/ArchivedNote';
import FlashMessage from './components/UI/FlashMessage/FlashMessage';

// If authenticated or not

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/archive" component={ArchivedNote} />
      </Switch>
      <FlashMessage />
      <Footer />
    </div>
  );
}

export default App;
