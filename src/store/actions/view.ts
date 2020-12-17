// Action types
export const SHOW_FLASH_MESSAGE = 'SHOW_FLASH_MESSAGE';
export const HIDE_FLASH_MESSAGE = 'HIDE_FLASH_MESSAGE';
export const GET_SEARCH_QUERY = 'GET_SEARCH_QUERY';

// Types
interface Message {
  showMessage: boolean;
  message: string;
}

export interface ViewState {
  flashMessage: Message;
  searchQuery: string;
}

export interface ShowFlashMessage {
  type: typeof SHOW_FLASH_MESSAGE;
  payload: string;
}

export interface HideFlashMessage {
  type: typeof HIDE_FLASH_MESSAGE;
}

export interface GetSearchQuery {
  type: typeof GET_SEARCH_QUERY;
  payload: string;
}

export type ViewTypes = ShowFlashMessage | HideFlashMessage | GetSearchQuery;

export const showFlashMessage = (text: string): ShowFlashMessage => {
  return {
    type: SHOW_FLASH_MESSAGE,
    payload: text,
  };
};

export const hideFlashMessage = (): HideFlashMessage => {
  return {
    type: HIDE_FLASH_MESSAGE,
  };
};

export const getSearchQuery = (query: string) => {
  return {
    type: GET_SEARCH_QUERY,
    payload: query,
  };
};
