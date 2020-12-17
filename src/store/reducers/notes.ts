import {
  NotesState,
  NotesTypes,
  InitNotes,
  InitLabels,
  GetEditableNote,
  ClearEditableNote,
  RemoveLabel,
  RenameLabel,
} from 'store/actions/notes';
import * as actionTypes from 'store/actions/notes';
import { updateObject, updateAllLabels } from 'shared/utility';

const initialState: NotesState = {
  notes: [],
  labels: [],
  editableNote: null,
};

const initNotes = (state: NotesState, action: InitNotes) => {
  const notes = {
    ...state,
    notes: action.payload,
  };
  return updateObject(state, notes);
};

const initLabels = (state: NotesState, action: InitLabels) => {
  const labels = {
    ...state,
    labels: action.payload,
  };
  return updateObject(state, labels);
};

const getEditableNote = (state: NotesState, action: GetEditableNote) => {
  const updatedNotes = {
    ...state,
    editableNote: action.payload,
  };
  return updateObject(state, updatedNotes);
};

const clearEditableNote = (state: NotesState, action: ClearEditableNote) => {
  const updatedNotes = {
    ...state,
    editableNote: null,
  };
  return updateObject(state, updatedNotes);
};

const removeLabel = (state: NotesState, action: RemoveLabel) => {
  const newLabels = state.labels.filter(
    (label) => label.name !== action.payload,
  );

  const updatedState = {
    ...state,
    labels: newLabels,
  };

  return updateObject(state, updatedState);
};

const renameLabel = (state: NotesState, action: RenameLabel) => {
  const oldLabel = action.oldLabel;
  const newLabel = action.newLabel;

  const newNotes = updateAllLabels(state.notes, oldLabel, newLabel);
  // Check
  const newLabels = state.labels.map((label) =>
    label.name === oldLabel ? newLabel : label,
  );

  const updatedLabels = {
    ...state,
    notes: newNotes,
    labels: newLabels,
  };

  return updateObject(state, updatedLabels);
};

// REDUCER
const reducer = (state = initialState, action: NotesTypes) => {
  switch (action.type) {
    case actionTypes.INIT_NOTES:
      return initNotes(state, action);
    case actionTypes.INIT_LABELS:
      return initLabels(state, action);
    case actionTypes.GET_EDITABLE_NOTE:
      return getEditableNote(state, action);
    case actionTypes.CLEAR_EDITABLE_NOTE:
      return clearEditableNote(state, action);
    case actionTypes.REMOVE_LABEL:
      return removeLabel(state, action);
    case actionTypes.RENAME_LABEL:
      return renameLabel(state, action);
    default:
      return state;
  }
};

export default reducer;
