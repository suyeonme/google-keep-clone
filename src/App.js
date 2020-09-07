import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ArchivedNote from './pages/ArchivedNote';

import Modal from './components/UI/Modal/Modal';

// If authenticated or not

function App() {
  //const [showModal, setShowModal] = useState(false); // redux
  // Modal Content

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/archive" component={ArchivedNote} />
      </Switch>
      <Footer />

      {/* {showModal && <Modal>This is Modal</Modal>} */}
    </div>
  );
}

export default App;
