import { combineReducers } from 'redux';
import { userReducers } from './user.reducers';

const rootReducers = combineReducers({
  userInfo: userReducers,
});

export default rootReducers;
export type AppState = ReturnType<typeof rootReducers>;
