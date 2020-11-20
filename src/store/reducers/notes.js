import * as actionTypes from '../actions/actionsTypes';
import { updateObject, updateAllLabels } from '../../shared/utility';

const initialState = {
  notes: [],
  archives: [],
  labels: [],
  editableNote: null,
};

const initArchives = (state, action) => {
  const notes = {
    ...state,
    archives: action.payload,
  };
  return updateObject(state, notes);
};

const initNotes = (state, action) => {
  const notes = {
    ...state,
    notes: action.payload,
  };
  return updateObject(state, notes);
};

const initLabels = (state, action) => {
  const labels = {
    ...state,
    labels: action.labels,
  };
  return updateObject(state, labels);
};

const getEditableNote = (state, action) => {
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

// const addLabel = (state, action) => {
//   const updatedLabels = {
//     ...state,
//     labels: [...state.labels, action.payload],
//   };
//   return updateObject(state, updatedLabels);
// };

const removeLabel = (state, action) => {
  const newLabels = state.labels.filter((label) => label.name !== action.label);

  const updatedState = {
    ...state,
    labels: newLabels,
  };

  return updateObject(state, updatedState);
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
    case actionTypes.INIT_ARCHIVES:
      return initArchives(state, action);
    case actionTypes.INIT_NOTES:
      return initNotes(state, action);
    case actionTypes.INIT_LABELS:
      return initLabels(state, action);
    case actionTypes.GET_EDITABLE_NOTE:
      return getEditableNote(state, action);
    case actionTypes.CLEAR_EDITABLE_NOTE:
      return clearEditableNote(state, action);
    // case actionTypes.ADD_LABEL:
    //   return addLabel(state, action);
    case actionTypes.REMOVE_LABEL:
      return removeLabel(state, action);
    case actionTypes.RENAME_LABEL:
      return renameLabel(state, action);
    default:
      return state;
  }
};

export default reducer;
