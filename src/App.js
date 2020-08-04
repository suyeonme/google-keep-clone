import React, {useState} from 'react';
import './App.scss'
import './components/Notes/Note/Note.scss';

import Header from './components/Header/Header';
import InputField from './components/InputField/InputField';
import Notes from './components/Notes/Notes';
import Footer from './components/Footer/Footer';

// Add functionality of Local Storage

function App() {
  const [notes, setNotes] = useState([]);

  const onAddNote = note => {
    if(note.title !== '' && note.content !== '') setNotes([...notes, note]); 
  };

  const onRemoveNote = id => {
    const filteredNotes = notes.filter((noteItem, i) => i !== id);
    setNotes(filteredNotes);
  };
    
  return (
    <div className="App">
      <Header />
      <InputField  onAddNote={onAddNote}  />
      <Notes noteList={notes} onRemove={onRemoveNote} />
      <Footer />
    </div>
  );
}

export default App;



/* import React, {useState, useEffect} from 'react';
import './App.scss'
import './components/Note/Note.scss';

import Header from './components/Header/Header';
import InputField from './components/InputField/InputField';
import Note from './components/Note/Note';
import Footer from './components/Footer/Footer';
import Backdrop from './components/UI/Backdrop';

function App() {
  const [notes, setNotes] = useState([]);
  const [showBackdrop, setShowBackdrop] = useState(false); 
  const [isSelected, setIsSelected] = useState(false); // TEST NOTE 
  let userNotes;

  const checkLocalStorage = () => {
    if(localStorage.getItem('notes') === null) {
      userNotes = [];
    } else {
      userNotes = JSON.parse(localStorage.getItem('notes'));
    }
  };

  useEffect(() => {
    checkLocalStorage();
    setNotes(userNotes);
  },[]);

  ///////// Local Storage Functions ////////////
  const saveStorage = note => {
    checkLocalStorage();
    userNotes.push(note);
    if(note !== null) localStorage.setItem('notes', JSON.stringify(userNotes));
  };

  const removeStorage = note => {
    checkLocalStorage();
    const noteIndex = note.title;
    userNotes.splice(userNotes.indexOf(noteIndex), 1);
    localStorage.setItem('notes', JSON.stringify(userNotes));
  };

  ///////// Note Functions ////////////
  const onAddNote = note => {
    if(note.title !== '' && note.content !== '') setNotes([...notes, note]); 
    saveStorage(note);
  };

  const onRemoveNote = id => {
    const filteredNotes = notes.filter((noteItem, i) => i !== id);
    setNotes(filteredNotes);
    removeStorage(note);
  };

  // Backdrop
  const onShowBackdrop = () => {
    setShowBackdrop(true);
    setIsSelected(true);
  };
  const onRemoveBackdrop = e => {
    setShowBackdrop(false);
    setIsSelected(false);
  };

  const note = notes.map((note, index) => {
    return <Note 
      title={note.title} 
      content={note.content} 
      id={index}
      key={index} 
      removed={onRemoveNote} 
      hasBackdrop={showBackdrop}
      clicked={onShowBackdrop} />
  });
    
  return (
    <div className="App">
      <Header />
      <InputField  onAddNote={onAddNote}  />
      { showBackdrop && <Backdrop close={onRemoveBackdrop}/> }
      <div className="Notes">{note}</div>
      <Footer />
    </div>
  );
}

export default App; */

