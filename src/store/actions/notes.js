import * as actions from './actionsTypes';

export const addNote = (note) => {
  return {
    type: actions.ADD_NOTE,
    payload: note,
  };
};

export const deleteNote = (id, type) => {
  return {
    type: actions.DELETE_NOTE,
    payload: id,
    noteType: type,
  };
};

export const updateNote = (noteType) => {
  return {
    type: actions.UPDATE_NOTE,
    noteType: noteType,
  };
};

export const changeNoteColor = (id, noteType, color) => {
  return {
    type: actions.CHANGE_NOTE_COLOR,
    id: id,
    noteType: noteType,
    bgColor: color,
  };
};

export const toggleNoteProperty = (id, noteType, property) => {
  return {
    type: actions.TOGGLE_NOTE_PROPERTY,
    payload: id,
    noteType: noteType,
    property: property,
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

// Archives
export const archiveNote = (id) => {
  return {
    type: actions.ARCHIVE_NOTE,
    payload: id,
  };
};

export const unarchiveNote = (id) => {
  return {
    type: actions.UNARCHIVE_NOTE,
    payload: id,
  };
};

// Label
export const addLabel = (label) => {
  return {
    type: actions.ADD_LABEL,
    payload: label,
  };
};

export const addNoteLabel = (id, label) => {
  return {
    type: actions.ADD_NOTE_LABEL,
    id: id,
    label: label,
  };
};
