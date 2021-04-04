import { LoginMobileResponse } from '../../types/login';
import { UPDATE_USER, REMOVE_USER } from '../actions/index';

interface UserState {
  userInfo: LoginMobileResponse;
}

interface UserAction {
  type: string;
  payload: LoginMobileResponse;
}

const initialState = {};

export const userReducers = (state: UserState = initialState, action: UserAction): UserState => {
  console.log('test_action_reducer: ', action.payload, action.data);
  switch (action.type) {
    case UPDATE_USER:
      const userInfo = action.payload || action.data;
      return { ...state, ...userInfo };
    case REMOVE_USER:
      state = {}
      return state;
    default:
      return state;
  }
};
