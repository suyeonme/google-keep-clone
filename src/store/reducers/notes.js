import * as actions from '../actions/actionsTypes';

const initialState = {
  notes: [],
  selectedNote: null,
  isSelected: false,
  editableNote: null,
  bgColor: '#fff',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case actions.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
          selectedNote: null,
          editableNote: null,
          isSelected: false,
      };
    case actions.SELECT_NOTE:
      return {
        ...state,
        selectedNote: action.payload,
          isSelected: true,
      };
    case actions.UNSELECT_NOTE:
      return {
        ...state,
        selectedNote: null,
          editableNote: null,
          isSelected: false,
      };
    case actions.GET_NOTE_COLOR:
      return {
        ...state,
        bgColor: action.payload,
      };
    case actions.CHANGE_NOTE_COLOR:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload ? {
            ...note,
            bgColor: state.bgColor
          } : note
        )
      };
    case actions.TOGGLE_CHECKBOX_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload ? {
            ...note,
            content: state.editableNote.content,
            isChecked: !note.isChecked
          } : note
        )
      }
      case actions.SAVE_EDITABLE_NOTE: // FIXME payload is old value
        return {
          ...state,
          editableNote: action.payload,
        };
      case actions.UPDATE_EDITABLE_NOTE:
        const oldNotes = state.notes.filter(note => note.id !== state.editableNote.id);
        return {
          ...state,
          notes: oldNotes.concat(state.editableNote),
            selectedNote: null,
            editableNote: null,
            isSelected: false,
        };
      default:
        return state;
  }
};

export default reducer;