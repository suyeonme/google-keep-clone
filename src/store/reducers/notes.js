/* import * as actions from '../actions/actionsTypes';

// STORE
const initialState = {
    notes: [],
    selectedNoteIndex: null,
    isSelected: false,
    editedNote: null,
    color: '#fff'
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
                isSelected: false,
                editedNote: null
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
                isSelected: false,
                editedNote: null
            }
        case actions.CHANGE_COLOR_NOTE:
            return { 
                ...state,
                color: action.payload
            }
        case actions.SAVE_EDITED_NOTE:
            return { 
                ...state,
                editedNote: action.payload
            }
        case actions.UPDATE_EDITED_NOTE:
            const oldNotes = state.notes.filter(note => note.id !== state.editedNote.id);
            return { 
                ...state,
                notes: oldNotes.concat(state.editedNote),
                selectedNoteIndex: null,
                isSelected: false,
                editedNote: null
            }

        // TEST
        case actions.GET_NOTE_INDEX:
            return {
                ...state,
                selectedNoteIndex: action.payload
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
    selectedNote: null,
    isSelected: false,
    editedNote: null,
    bgColor: '#fff'
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
                selectedNote: null,
                editedNote: null,
                isSelected: false
            }
        case actions.SELECT_NOTE:
            return { 
                ...state,
                selectedNote: action.payload,
                isSelected: true
            }
        case actions.UNSELECT_NOTE:
            return { 
                ...state,
                selectedNote: null,
                editedNote: null,
                isSelected: false
            }
        case actions.GET_NOTE_ID: 
            return { 
                ...state,
                selectedNote: action.payload
            }
        case actions.CHANGE_COLOR_NOTE:
            return { 
                ...state,
                bgColor: action.payload
            }
        case actions.SAVE_EDITED_NOTE:
            return { 
                ...state,
                editedNote: action.payload,
            }
        case actions.UPDATE_EDITED_NOTE:
            const oldNotes = state.notes.filter(note => note.id !== state.editedNote.id);
            return { 
                ...state,
                notes: oldNotes.concat(state.editedNote),
                selectedNote: null,
                editedNote: null,
                isSelected: false
            }
        default:
            return state;
    }
};

export default reducer;

