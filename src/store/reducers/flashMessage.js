import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  showMessage: false,
  message: '',
};

const showFlashMessage = (state, action) => {
  const updatedState = {
    showMessage: true,
    message: action.payload,
  };
  return updateObject(state, updatedState);
};

const hideFlashMessage = (state, action) => {
  return updateObject(state, initialState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_FLASH_MESSAGE:
      return showFlashMessage(state, action);
    case actionTypes.HIDE_FLASH_MESSAGE:
      return hideFlashMessage(state, action);
    default:
      return state;
  }
};

export default reducer;
