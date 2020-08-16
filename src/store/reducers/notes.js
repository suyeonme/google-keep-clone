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
                notes: [action.payload, ...state.notes]
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
        case actions.GET_COLOR_NOTE: // get color - change color - save edited note : OK
            return {                 // select note - save note - get color - change color - save note : NOT
                ...state,
                bgColor: action.payload
            }
        case actions.CHANGE_COLOR_NOTE: 
            return {
                ...state,
                notes: state.notes.map(note => note.id === action.payload ? // old note 
                    { ...note, bgColor: state.bgColor } 
                    : note       
                )
            };
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

