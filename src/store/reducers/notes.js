import * as actionTypes from '../actions/actionsTypes';
import { updateObject, updateAllLabels } from '../../shared/utility';

const initialState = {
  notes: [],
  archives: [],
  labels: [],
  editableNote: null,
};

const initNotes = (state, action) => {
  const notes = {
    ...state,
    notes: action.payload,
  };
  return updateObject(state, notes);
};

const initLabels = (state, action) => {
  const labels = { ...state, labels: action.labels };
  return updateObject(state, labels);
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

const addLabel = (state, action) => {
  const updatedLabels = {
    ...state,
    labels: [...state.labels, action.payload],
  };
  return updateObject(state, updatedLabels);
};

const renameLabel = (state, action) => {
  const oldLabel = action.oldLabel;
  const newLabel = action.newLabel;

  const newNotes = updateAllLabels(state.notes, oldLabel, newLabel);
  const newArchives = updateAllLabels(state.archives, oldLabel, newLabel);
  const newLabels = state.labels.map((label) =>
    label === oldLabel ? newLabel : label,
  );

  const updatedLabels = {
    ...state,
    notes: newNotes,
    archives: newArchives,
    labels: newLabels,
  };

  return updateObject(state, updatedLabels);
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_NOTES:
      return initNotes(state, action);
    case actionTypes.INIT_LABELS:
      return initLabels(state, action);
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
    case actionTypes.RENAME_LABEL:
      return renameLabel(state, action);
    default:
      return state;
  }
};

export default reducer;
