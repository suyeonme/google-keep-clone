import * as actions from './actionsTypes';

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

export const selectNote = index => {
    return {
        type: actions.SELECT_NOTE,
        payload: index
    };
};

export const unSelectNote = index => {
    return {
        type: actions.UNSELECT_NOTE
    };
};