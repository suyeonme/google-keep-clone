/* import * as actions from './actionsTypes';

// NOTE
export const saveNote = note => {
    return {
        type: actions.SAVE_NOTE,
        payload: note
    };
};

export const deleteNote = id => {
    return {
        type: actions.DELETE_NOTE,
        payload: id
    };
};

export const selectNote = id => {
    return {
        type: actions.SELECT_NOTE,
        payload: id
    };
};

export const unSelectNote = () => {
    return {
        type: actions.UNSELECT_NOTE
    };
};

export const changeColorNote = color => {
    return {
        type: actions.CHANGE_COLOR_NOTE,
        payload: color
    };
};

// EDITED NOTE
export const saveEditedNote = editedNote => {
    return {
        type: actions.SAVE_EDITED_NOTE,
        payload: editedNote
    };
};

export const updateEditedNote = () => {
    return {
        type: actions.UPDATE_EDITED_NOTE,
    };
};


// TEST
export const getNoteIndex = (id) => {
    return {
        type: actions.GET_NOTE_INDEX,
        payload: id
    };
};
 */

import * as actions from './actionsTypes';

// NOTE
export const saveNote = note => {
    return {
        type: actions.SAVE_NOTE,
        payload: note
    };
};

export const deleteNote = id => {
    return {
        type: actions.DELETE_NOTE,
        payload: id
    };
};

export const selectNote = id => {
    return {
        type: actions.SELECT_NOTE,
        payload: id
    };
};

export const unSelectNote = () => {
    return {
        type: actions.UNSELECT_NOTE
    };
};

export const getNoteId = id => {
    return {
        type: actions.SELECT_NOTE,
        payload: id
    };
};

export const changeColorNote = color => {
    return {
        type: actions.CHANGE_COLOR_NOTE,
        payload: color
    };
};

// EDITED NOTE
export const saveEditedNote = editedNote => {
    return {
        type: actions.SAVE_EDITED_NOTE,
        payload: editedNote
    };
};

export const updateEditedNote = () => {
    return {
        type: actions.UPDATE_EDITED_NOTE,
    };
};

