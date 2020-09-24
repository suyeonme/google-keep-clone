import * as actions from './actionsTypes';

export const initArchives = (notes) => {
  return {
    type: actions.INIT_ARCHIVES,
    payload: notes,
  };
};

export const initNotes = (notes) => {
  return {
    type: actions.INIT_NOTES,
    payload: notes,
  };
};

export const initLabels = (labels) => {
  return {
    type: actions.INIT_LABELS,
    labels,
  };
};

export const getEditableNote = (editableNote) => {
  return {
    type: actions.GET_EDITABLE_NOTE,
    payload: editableNote,
  };
};

export const clearEditableNote = () => {
  return {
    type: actions.CLEAR_EDITABLE_NOTE,
  };
};

export const addLabel = (label) => {
  return {
    type: actions.ADD_LABEL,
    payload: label,
  };
};

export const removeLabel = (label) => {
  return {
    type: actions.REMOVE_LABEL,
    label: label,
  };
};

export const renameLabel = (oldLabel, newLabel) => {
  return {
    type: actions.RENAME_LABEL,
    oldLabel: oldLabel,
    newLabel: newLabel,
  };
};
