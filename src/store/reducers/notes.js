
//////// ADD Action Type

// STORE
const initialState = {
    notes: [],
    selectedNoteIndex: null,
    isSelected: false,
};

// REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_NOTE':
            return {
                ...state,
                notes: state.notes.concat(action.payload)
            };
        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter((_, index) => index !== action.payload),
                selectedNoteIndex: null,
                isSelected: false 
            }
        case 'SELECT_NOTE':
            return { 
                ...state,
                selectedNoteIndex: action.payload,
                isSelected: true
            }
        case 'UNSELECT_NOTE':
        return { 
            ...state,
            selectedNoteIndex: null,
            isSelected: false
        }
        default:
            return state;
    }
};

export default reducer;







