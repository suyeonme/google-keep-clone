import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  flashMessage: {
    showMessage: false,
    message: '',
  },
  searchQuery: '',
};

const showFlashMessage = (state, action) => {
  const updatedState = {
    ...state,
    flashMessage: {
      showMessage: true,
      message: action.payload,
    },
  };
  return updateObject(state, updatedState);
};

const hideFlashMessage = (state) => {
  return updateObject(state, initialState);
};

const getSearchQuery = (state, action) => {
  const updatedState = {
    ...state,
    searchQuery: action.payload,
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_FLASH_MESSAGE:
      return showFlashMessage(state, action);
    case actionTypes.HIDE_FLASH_MESSAGE:
      return hideFlashMessage(state, action);
    case actionTypes.GET_SEARCH_QUERY:
      return getSearchQuery(state, action);
    default:
      return state;
  }
};

export default reducer;
