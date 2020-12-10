import * as actionTypes from './actionsTypes';

export const showFlashMessage = (content) => {
  return {
    type: actionTypes.SHOW_FLASH_MESSAGE,
    payload: content,
  };
};

export const hideFlashMessage = (content) => {
  return {
    type: actionTypes.HIDE_FLASH_MESSAGE,
  };
};

export const getSearchQuery = (query) => {
  return {
    type: actionTypes.GET_SEARCH_QUERY,
    payload: query,
  };
};
