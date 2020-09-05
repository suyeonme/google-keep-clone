import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import InputField from './containers/InputField/InputField';
import Notes from './containers/Notes/Notes';
import Footer from './components/Footer/Footer';
import ArchivedNote from './components/ArchivedNote/ArchivedNote';

import Home from './pages/Home';

// If authenticated or not

function App() {
  return (
    <div className="App">
      <Header />
      {/* <InputField />
      <Notes /> */}

      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/archive" component={ArchivedNote} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
