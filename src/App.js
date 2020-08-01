import React, {useState, useEffect} from 'react';
import './App.scss'

import Header from './components/Header/Header';
import InputField from './components/InputField/InputField';
import Note from './components/Note/Note';
import Footer from './components/Footer/Footer';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Get notes from localStorage
    getStorage();
    setNotes(userNotes);
  },[]);

    ///////// Local Storage Functions ////////////
    let userNotes;
  
    const saveStorage = note => {
      getStorage();
      userNotes.push(note);
      if(note !== null) localStorage.setItem('notes', JSON.stringify(userNotes));
    };
  
    const getStorage = () => {
      if(localStorage.getItem('notes') === null) {
        userNotes = [];
      } else {
        userNotes = JSON.parse(localStorage.getItem('notes'));
      }
    };

  const removeStorage = note => {
    getStorage();
    const noteIndex = note.title;
    userNotes.splice(userNotes.indexOf(noteIndex), 1);
    localStorage.setItem('notes', JSON.stringify(userNotes));
  };

  ///////// Note Functions ////////////
  const addNoteHandler = note => {
    if(note.title !== '' && note.content !== '') setNotes([...notes, note]); 
    saveStorage(note);
  };

  const removeNoteHandler = id => {
    const filteredNotes = notes.filter((noteItem, i) => i !== id);
    setNotes(filteredNotes);
    removeStorage(note);
  };
  

  const note = notes.map((note, index) => {
    return <Note 
      title={note.title} 
      content={note.content} 
      onRemove={removeNoteHandler} 
      key={index} 
      id={index}/>
  });
    
  return (
    <div className="App">
      <Header />
      <InputField onAddNote={addNoteHandler}/>
      <div className="notes">{note}</div>
      <Footer />
    </div>
  );
}

export default App;

