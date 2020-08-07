/* import * as actions from '../actions/actionsTypes';

// STORE
const initialState = {
    notes: [],
    selectedNoteIndex: null,
    isSelected: false,

    note: null,
    editedNote: null
};

// REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SAVE_NOTE:
            return {
                ...state,
                notes: state.notes.concat(action.payload)
            };
        case actions.DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter((_, index) => index !== action.payload),
                selectedNoteIndex: null,
                isSelected: false 
            }
        case actions.SELECT_NOTE:
            return { 
                ...state,
                selectedNoteIndex: action.payload,
                isSelected: true
            }
        case actions.UNSELECT_NOTE:
            return { 
                ...state,
                selectedNoteIndex: null,
                isSelected: false
            }
        case actions.SAVE_EDITED_NOTE:
            return { 
                ...state,
                editedNote: action.payload
            }
        case actions.UPDATE_EDITED_NOTE:
            const oldNotes = [...state.notes];
            const newNotes = oldNotes.splice(id, 1);
            return { 
                ...state,
                notes: newNotes.concat(action.payload)
            }
        default:
            return state;
    }
};

export default reducer;
 */

import * as actions from '../actions/actionsTypes';

// STORE
const initialState = {
    notes: [],
    selectedNoteIndex: null,
    isSelected: false,

    note: null,
    editedNote: null
};

// REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SAVE_NOTE:
            return {
                ...state,
                notes: state.notes.concat(action.payload)
            };
        case actions.DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload),
                selectedNoteIndex: null,
                isSelected: false 
            }
        case actions.SELECT_NOTE:
            return { 
                ...state,
                selectedNoteIndex: action.payload,
                isSelected: true
            }
        case actions.UNSELECT_NOTE:
            return { 
                ...state,
                selectedNoteIndex: null,
                isSelected: false
            }
        case actions.SAVE_EDITED_NOTE:
            return { 
                ...state,
                editedNote: action.payload
            }
        case actions.UPDATE_EDITED_NOTE:
            const oldNotes = [...state.notes];
            //const newNotes = oldNotes.splice(id, 1);
            return { 
                ...state,
                //notes: newNotes.concat(action.payload)
            }
        default:
            return state;
    }
};

export default reducer;
