import { combineReducers } from 'redux';
import conversationListReducer from '../Reducers/ConversationList.reducer';
import currentUserReducer from '../Reducers/CurrentUser.reducer';
import responseMessReducer from '../Reducers/ResponseMess.reducer';

const rootReducer = combineReducers({

    responseMess: responseMessReducer,
    currentUser: currentUserReducer,
    conversationList: conversationListReducer

});

export default rootReducer;