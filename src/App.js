import React  from 'react';

import Header from './components/Header/Header';
import InputField from './containers/InputField/InputField';
import Notes from './containers/Notes/Notes';
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


