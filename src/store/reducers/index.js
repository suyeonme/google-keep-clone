import { combineReducers } from 'redux';
import flashMessage from './flashMessage';
import notes from './notes';

const rootReducer = combineReducers({
  flashMessage,
  notes,
});

export default rootReducer;
