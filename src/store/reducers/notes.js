import * as actionTypes from '../actions/actionsTypes';
import { updateObject, removeLabelFromNote } from '../../shared/utility';

// Repeated variables: action.noteType
// Repeated methods -> Utility functions

const initialState = {
  notes: [],
  archives: [],
  labels: [],
  editableNote: null,
};

// addLabel - addItem
const addNote = (state, action) => {
  const updatedNote = {
    ...state,
    notes: [action.payload, ...state.notes],
  };
  return updateObject(state, updatedNote);
};

const deleteNote = (state, action) => {
  const newNotes = state[action.noteType].filter(
    (item) => item.id !== action.payload,
  );

  const updatedNotes = {
    ...state,
    [action.noteType]: newNotes,
    editableNote: null,
  };
  return updateObject(state, updatedNotes);
};

const updateNote = (state, action) => {
  // Filter and change
  const newNotes = state[action.noteType]
    .filter((note) => note.id !== state.editableNote.id)
    .concat(state.editableNote);

  const updatedNote = {
    ...state,
    [action.noteType]: newNotes,
    editableNote: null,
  };
  return updateObject(state, updatedNote);
};

const changeNoteColor = (state, action) => {
  const newNotes = state[action.noteType].map((note) =>
    note.id === action.id
      ? {
          ...note,
          bgColor: action.bgColor,
        }
      : note,
  );
  const updatedNotes = {
    ...state,
    [action.noteType]: newNotes,
  };
  return updateObject(state, updatedNotes);
};

const toggleNoteProperty = (state, action) => {
  const property = action.property;

  const updatedNotes = state[action.noteType].map((note) => {
    if (note.id === action.payload) {
      if (state.editableNote) {
        return {
          ...note,
          content: state.editableNote.content,
          [property]: !note[property],
        };
      }
      return {
        ...note,
        [property]: !note[property],
      };
    }
    return note;
  });

  const newNotes = {
    ...state,
    [action.noteType]: updatedNotes,
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

// Label
const addLabel = (state, action) => {
  const updatedLabels = {
    ...state,
    labels: [...state.labels, action.payload],
  };
  return updateObject(state, updatedLabels);
};

const removeLabel = (state, action) => {
  const newLabels = state.labels.filter((label) => label !== action.label);
  const newNotes = removeLabelFromNote(state.notes, action.label);
  const newArchives = removeLabelFromNote(state.archives, action.label);

  const updatedState = {
    ...state,
    labels: newLabels,
    notes: newNotes,
    archives: newArchives,
  };

  return updateObject(state, updatedState);
};

const addNoteLabel = (state, action) => {
  const newNotes = state[action.noteType].map((note) =>
    note.id === action.id && !note.labels.includes(action.label)
      ? {
          ...note,
          labels: [...note.labels, action.label],
        }
      : note,
  );

  const updatedNotes = {
    ...state,
    [action.noteType]: newNotes,
  };
  return updateObject(state, updatedNotes);
};

const removeNoteLabel = (state, action) => {
  const newNotes = state[action.noteType].map((note) =>
    note.id === action.id
      ? {
          ...note,
          labels: note.labels.filter((label) => label !== action.label),
        }
      : note,
  );

  const updatedNotes = {
    ...state,
    [action.noteType]: newNotes,
  };
  return updateObject(state, updatedNotes);
};

const renameLabel = (state, action) => {
  const newLabels = state.labels.map((label) =>
    label === action.oldLabel ? action.newLabel : label,
  );

  const newNotes = state[action.noteType].map((note) =>
    note.labels.includes(action.oldLabel)
      ? {
          ...note,
          labels: note.labels
            .filter((l) => l !== action.oldLabel)
            .concat(action.newLabel),
        }
      : note,
  );

  const updatedLabels = {
    ...state,
    [action.noteType]: newNotes,
    labels: newLabels,
  };
  return updateObject(state, updatedLabels);
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTE:
      return addNote(state, action);
    case actionTypes.DELETE_NOTE:
      return deleteNote(state, action);
    case actionTypes.UPDATE_NOTE:
      return updateNote(state, action);
    case actionTypes.CHANGE_NOTE_COLOR:
      return changeNoteColor(state, action);
    case actionTypes.TOGGLE_NOTE_PROPERTY:
      return toggleNoteProperty(state, action);
    case actionTypes.GET_EDITABLE_NOTE:
      return getEditableNote(state, action);
    case actionTypes.CLEAR_EDITABLE_NOTE:
      return clearEditableNote(state, action);
    case actionTypes.ARCHIVE_NOTE:
      return archiveNote(state, action);
    case actionTypes.UNARCHIVE_NOTE:
      return unarchiveNote(state, action);
    case actionTypes.ADD_LABEL:
      return addLabel(state, action);
    case actionTypes.REMOVE_LABEL:
      return removeLabel(state, action);
    case actionTypes.RENAME_LABEL:
      return renameLabel(state, action);
    case actionTypes.ADD_NOTE_LABEL:
      return addNoteLabel(state, action);
    case actionTypes.REMOVE_NOTE_LABEL:
      return removeNoteLabel(state, action);
    default:
      return state;
  }
};

export default reducer;

// const createNewItems = (arr) => {
//   return arr.map((note) =>
//     note.labels.includes(action.label)
//       ? {
//           ...note,
//           labels: note.labels.filter((l) => l !== action.label),
//         }
//       : note,
//   );
// };

// const newNotes = createNewItems(state.notes);
// const newArchives = createNewItems(state.archives);
