import {
  ViewState,
  ViewTypes,
  ShowFlashMessage,
  GetSearchQuery,
} from 'store/actions/view';
import * as actionTypes from 'store/actions/view';
import { updateObject } from 'shared/utility';

const initialState: ViewState = {
  flashMessage: {
    showMessage: false,
    message: '',
  },
  searchQuery: '',
};

const showFlashMessage = (state: ViewState, action: ShowFlashMessage) => {
  const updatedState = {
    ...state,
    flashMessage: {
      showMessage: true,
      message: action.payload,
    },
  };
  return updateObject(state, updatedState);
};

const hideFlashMessage = (state: ViewState) => {
  return updateObject(state, initialState);
};

const getSearchQuery = (state: ViewState, action: GetSearchQuery) => {
  const updatedState = {
    ...state,
    searchQuery: action.payload,
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action: ViewTypes) => {
  switch (action.type) {
    case actionTypes.SHOW_FLASH_MESSAGE:
      return showFlashMessage(state, action);
    case actionTypes.HIDE_FLASH_MESSAGE:
      return hideFlashMessage(state);
    case actionTypes.GET_SEARCH_QUERY:
      return getSearchQuery(state, action);
    default:
      return state;
  }
};

export default reducer;
