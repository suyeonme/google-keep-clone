export const saveNote = note => {
    return {
        type: 'SAVE_NOTE',
        payload: note
    };
};

export const deleteNote = id => {
    return {
        type: 'DELETE_NOTE',
        payload: id
    };
};

export const selectNote = index => {
    return {
        type: 'SELECT_NOTE',
        payload: index
    };
};