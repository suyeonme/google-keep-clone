import { combineReducers } from 'redux';
import view from './view';
import notes from './notes';

const rootReducer = combineReducers({
  view,
  notes,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
