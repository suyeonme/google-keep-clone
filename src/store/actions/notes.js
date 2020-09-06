import * as actions from './actionsTypes';

// NOTE
export const addNote = (note) => {
  return {
    type: actions.ADD_NOTE,
    payload: note,
  };
};
export const deleteNote = (id) => {
  return {
    type: actions.DELETE_NOTE,
    payload: id,
  };
};
export const selectNote = (id) => {
  return {
    type: actions.SELECT_NOTE,
    payload: id,
  };
};
export const unSelectNote = () => {
  return {
    type: actions.UNSELECT_NOTE,
  };
};
export const getNoteColor = (color) => {
  return {
    type: actions.GET_NOTE_COLOR,
    payload: color,
  };
};
export const changeNoteColor = (id) => {
  return {
    type: actions.CHANGE_NOTE_COLOR,
    payload: id,
  };
};
export const toggleCheckbox = (id) => {
  return {
    type: actions.TOGGLE_NOTE_CHECKBOX,
    payload: id,
  };
};
// EDITED NOTE
export const saveEditableNote = (editableNote) => {
  return {
    type: actions.SAVE_EDITABLE_NOTE,
    payload: editableNote,
  };
};
export const updateEditableNote = () => {
  return {
    type: actions.UPDATE_EDITABLE_NOTE,
  };
};

// ARCHIVE NOTE
export const archiveNote = (id) => {
  return {
    type: actions.ARCHIVE_NOTE,
    payload: id,
  };
};

export const deleteArchivedNote = (id) => {
  return {
    type: actions.DELETE_ARCHIVE_NOTE,
    payload: id,
  };
};
