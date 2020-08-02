import React, {useState, useEffect} from 'react';
import './App.scss'
import './components/Note/Note.scss';

import Header from './components/Header/Header';
import InputField from './components/InputField/InputField';
import Note from './components/Note/Note';
import Footer from './components/Footer/Footer';
import Backdrop from './components/UI/Backdrop';

function App() {
  const [notes, setNotes] = useState([]);
  const [isClicked, setIsClicked] = useState(false); // Backdrop
  const [isClickedInput, setIsClickedInput] = useState(false); // Input
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
  const addNoteHandler = note => {
    if(note.title !== '' && note.content !== '') setNotes([...notes, note]); 
    saveStorage(note);
  };

  const removeNoteHandler = id => {
    const filteredNotes = notes.filter((noteItem, i) => i !== id);
    setNotes(filteredNotes);
    removeStorage(note);
  };

  // Backdrop
  const foldNoteHandler = () => {
    //setIsClicked(!isClicked);
  };

  // Input (test)
  const foldInputHandler = () => {
    setIsClickedInput(false);
  };
  const unFoldInputHandler = e => {
    e.stopPropagation();
    setIsClickedInput(true);
  };
  
  const note = notes.map((note, index) => {
    return <Note 
      title={note.title} 
      content={note.content} 
      onRemove={removeNoteHandler} 
      id={index}
      key={index} 
      isClicked={isClicked}
      clicked={foldNoteHandler}
      />
  });
    
  return (
    <div className="App">
      <Header />
      <InputField 
        onAddNote={addNoteHandler} 
        show={unFoldInputHandler} 
        isClicked={isClickedInput} 
        closed={foldInputHandler} />
      { isClicked && <Backdrop show={foldNoteHandler} /> }
      <div className="Notes">{note}</div>
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

function App() {
  const [notes, setNotes] = useState([]);
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
    if(localStorage.getItem('notes') === null) {
      userNotes = [];
    } else {
      userNotes = JSON.parse(localStorage.getItem('notes'));
    }

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
      id={index}
      key={index} 
      />
  });
    
  return (
    <div className="App">
      <Header />
      <InputField onAddNote={addNoteHandler}/>
      <div className="Notes">{note}</div>
      <Footer />
    </div>
  );
}

export default App;
 */