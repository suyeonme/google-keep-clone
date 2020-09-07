import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

// TODO
// Refactoring: selectedNote, editableNote
// Refactoring: Share the same value between editableNote and note

const initialState = {
  notes: [],
  editableNote: null,
  bgColor: '#fff',
  archives: [],
};

const addNote = (state, action) => {
  const updatedNote = {
    ...state,
    notes: [action.payload, ...state.notes],
  };
  return updateObject(state, updatedNote);
};

const deleteNote = (state, action) => {
  const noteType = action.noteType;
  const newNotes = state[noteType].filter((item) => item.id !== action.payload);

  const updatedNotes = {
    ...state,
    [noteType]: newNotes,
    editableNote: null,
  };
  return updateObject(state, updatedNotes);
};

const getNoteColor = (state, action) => {
  const updateBgColor = {
    ...state,
    bgColor: action.payload,
  };
  return updateObject(state, updateBgColor);
};

const changeNoteColor = (state, action) => {
  const newNotes = state.notes.map((note) =>
    note.id === action.payload
      ? {
          ...note,
          bgColor: state.bgColor,
        }
      : note,
  );
  const updatedNotes = {
    ...state,
    notes: newNotes,
  };
  return updateObject(state, updatedNotes);
};

const toggleNoteCheckbox = (state, action) => {
  const updatedNotes = state.notes.map((note) => {
    if (note.id === action.payload && state.editableNote) {
      return {
        ...note,
        content: state.editableNote.content,
        isChecked: !note.isChecked,
      };
    }

    if (note.id === action.payload && !state.editableNote) {
      return {
        ...note,
        isChecked: !note.isChecked,
      };
    }
    return note;
  });

  const newNotes = {
    ...state,
    notes: updatedNotes,
  };
  return updateObject(state, newNotes);
};

const getEditableNote = (state, action) => {
  // FIXME payload is old value
  // What if editableNote and note share the same value?
  const updatedNotes = {
    ...state,
    editableNote: action.payload,
  };
  return updateObject(state, updatedNotes);
};

const clearEditableNote = (state, action) => {
  const updatedNotes = {
    ...state,
    editableNote: null,
  };
  return updateObject(state, updatedNotes);
};

const updateEditableNote = (state, action) => {
  const newNotes = state.notes
    .filter((note) => note.id !== state.editableNote.id)
    .concat(state.editableNote);

  const updatedNote = {
    ...state,
    notes: newNotes,
    selectedNote: null,
    editableNote: null,
  };
  return updateObject(state, updatedNote);
};

// Archives
const archiveNote = (state, action) => {
  const archivedNote = state.notes.find((note) => note.id === action.payload);
  const newNotes = state.notes.filter((note) => note.id !== action.payload);

  const updatedNotes = {
    ...state,
    notes: newNotes,
    archives: [...state.archives, archivedNote],
  };
  return updateObject(state, updatedNotes);
};

const unarchiveNote = (state, action) => {
  const unarchivedNote = state.archives.find(
    (note) => note.id === action.payload,
  );
  const newNotes = state.archives.filter((note) => note.id !== action.payload);

  const updatedNotes = {
    ...state,
    notes: [...state.notes, unarchivedNote],
    archives: newNotes,
  };
  return updateObject(state, updatedNotes);
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTE:
      return addNote(state, action);
    case actionTypes.DELETE_NOTE:
      return deleteNote(state, action);
    case actionTypes.GET_NOTE_COLOR:
      return getNoteColor(state, action);
    case actionTypes.CHANGE_NOTE_COLOR:
      return changeNoteColor(state, action);
    case actionTypes.TOGGLE_NOTE_CHECKBOX:
      return toggleNoteCheckbox(state, action);
    case actionTypes.GET_EDITABLE_NOTE:
      return getEditableNote(state, action);
    case actionTypes.CLEAR_EDITABLE_NOTE:
      return clearEditableNote(state, action);
    case actionTypes.UPDATE_EDITABLE_NOTE:
      return updateEditableNote(state, action);
    case actionTypes.ARCHIVE_NOTE:
      return archiveNote(state, action);
    case actionTypes.UNARCHIVE_NOTE:
      return unarchiveNote(state, action);
    default:
      return state;
  }
};

export default reducer;
