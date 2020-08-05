import React  from 'react';

import './App.scss'
import Header from './components/Header/Header';
import InputField from './components/InputField/InputField';
import Notes from './components/Notes/Notes';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <InputField />
      <Notes />
      <Footer />
    </div>
  );
}

export default App;


