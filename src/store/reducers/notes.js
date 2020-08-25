import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  notes: [],
  selectedNote: null,
  isSelected: false,
  editableNote: null,
  bgColor: '#fff',
};

const addNote = (state, action) => {
  const updatedNote = {
    ...state,
    notes: [action.payload, ...state.notes],
  };
  return updateObject(state, updatedNote);
};

const deleteNote = (state, action) => {
  const newNotes = state.notes.filter((note) => note.id !== action.payload);
  const updatedNote = {
    ...state,
    notes: newNotes,
    selectedNote: null,
    editableNote: null,
    isSelected: false,
  };
  return updateObject(state, updatedNote);
};

const selectNote = (state, action) => {
  const selectedNote = {
    ...state,
    selectedNote: action.payload,
    isSelected: true,
  };
  return updateObject(state, selectedNote);
};

const unselectNote = (state, action) => {
  const unselectedNote = {
    ...state,
    selectedNote: null,
    editableNote: null,
    isSelected: false,
  };
  return updateObject(state, unselectedNote);
};

const getNoteColor = (state, action) => {
  const updatedNote = {
    ...state,
    bgColor: action.payload,
  };
  return updateObject(state, updatedNote);
};

const changeNoteColor = (state, action) => {
  const changeColor = state.notes.map((note) =>
    note.id === action.payload ? { ...note, bgColor: state.bgColor } : note,
  );
  const updatedNote = {
    ...state,
    notes: changeColor,
  };
  return updateObject(state, updatedNote);
};

const toggleNoteCheckbox = (state, action) => {
  const checkedNote = state.notes.map((note) => {
    if (note.id === action.payload && state.editableNote) {
      return {
        ...note,
        content: state.editableNote.content,
        isChecked: !note.isChecked,
      };
    }
    return { ...note, isChecked: !note.isChecked };
  });

  const updatedNote = {
    ...state,
    notes: checkedNote,
  };
  return updateObject(state, updatedNote);
};

const saveEditableNote = (state, action) => {
  // FIXME payload is old value
  const updatedNote = {
    ...state,
    editableNote: action.payload,
  };
  return updateObject(state, updatedNote);
};

const updateEditableNote = (state, action) => {
  const oldNotes = state.notes
    .filter((note) => note.id !== state.editableNote.id)
    .concat(state.editableNote);

  const updatedNote = {
    ...state,
    notes: oldNotes,
    selectedNote: null,
    editableNote: null,
    isSelected: false,
  };
  return updateObject(state, updatedNote);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTE:
      return addNote(state, action);
    case actionTypes.DELETE_NOTE:
      return deleteNote(state, action);
    case actionTypes.SELECT_NOTE:
      return selectNote(state, action);
    case actionTypes.UNSELECT_NOTE:
      return unselectNote(state, action);
    case actionTypes.GET_NOTE_COLOR:
      return getNoteColor(state, action);
    case actionTypes.CHANGE_NOTE_COLOR:
      return changeNoteColor(state, action);
    case actionTypes.TOGGLE_CHECKBOX_NOTE:
      return toggleNoteCheckbox(state, action);
    case actionTypes.SAVE_EDITABLE_NOTE:
      return saveEditableNote(state, action);
    case actionTypes.UPDATE_EDITABLE_NOTE:
      return updateEditableNote(state, action);
    default:
      return state;
  }
};

export default reducer;

/* const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case actions.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
        selectedNote: null,
        editableNote: null,
        isSelected: false,
      };
    case actions.SELECT_NOTE:
      return {
        ...state,
        selectedNote: action.payload,
        isSelected: true,
      };
    case actions.UNSELECT_NOTE:
      return {
        ...state,
        selectedNote: null,
        editableNote: null,
        isSelected: false,
      };
    case actions.GET_NOTE_COLOR:
      return {
        ...state,
        bgColor: action.payload,
      };
    case actions.CHANGE_NOTE_COLOR:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload
            ? {
                ...note,
                bgColor: state.bgColor,
              }
            : note,
        ),
      };
    case actions.TOGGLE_CHECKBOX_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload && state.editableNote
            ? {
                ...note,
                content: state.editableNote.content,
                isChecked: !note.isChecked,
              }
            : { ...note, isChecked: !note.isChecked },
        ),
      };
    case actions.SAVE_EDITABLE_NOTE: // FIXME payload is old value
      return {
        ...state,
        editableNote: action.payload,
      };
    case actions.UPDATE_EDITABLE_NOTE:
      const oldNotes = state.notes.filter(
        (note) => note.id !== state.editableNote.id,
      );
      return {
        ...state,
        notes: oldNotes.concat(state.editableNote),
        selectedNote: null,
        editableNote: null,
        isSelected: false,
      };
    default:
      return state;
  }
};

export default reducer; */
