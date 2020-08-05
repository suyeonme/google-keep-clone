//////// ADD Action Type

// When click note, it show backdrop and chagne style of note.
// When click backdrop, it remove backdrop and change style back to original 


// STORE
const initialState = {
    notes: [],
    isSelected: false,

    
    showBackdrop: false,
};

// REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_NOTE':
            return {
                ...state.notes,
                notes: state.notes.concat(action.payload)
            };
        case 'DELETE_NOTE':
            return {
                ...state.notes,
                notes: state.notes.filter((_, index) => index !== action.payload)
            }
        case 'SELECT_NOTE':
            return { 
                isSelected: true
            }
        case 'UNSELECT_NOTE':
            return { 
                isSelected: false
            }
        default:
            return state;
    }
};

export default reducer;







