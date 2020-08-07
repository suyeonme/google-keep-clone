import * as actions from '../actions/actionsTypes';

// STORE
const initialState = {
    notes: [],
    selectedNoteIndex: null,
    isSelected: false,
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
        case actions.SAVE_EDITED_NOTE:
            return { 
                ...state,
                editedNote: action.payload
            }
        case actions.UPDATE_EDITED_NOTE:
            const oldNotes = state.notes.filter(note => note.id !== state.editedNote.id);
            // Delete note having same id -> Add edited note 
            // When something is changed, re-render as new content
            return { 
                ...state,
                notes: oldNotes.concat(state.editedNote),
                selectedNoteIndex: null,
                isSelected: false,
                editedNote: null
            }
        default:
            return state;
    }
};

export default reducer;
