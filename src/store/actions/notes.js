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

export const getNoteColor = (color) => {
  return {
    type: actions.GET_NOTE_COLOR,
    payload: color,
  };
};

export const changeNoteColor = (id, noteType) => {
  return {
    type: actions.CHANGE_NOTE_COLOR,
    payload: id,
    noteType: noteType,
  };
};

export const toggleCheckbox = (id, noteType) => {
  return {
    type: actions.TOGGLE_NOTE_CHECKBOX,
    payload: id,
    noteType: noteType,
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
