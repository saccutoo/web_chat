/* 
    Created by longdq
*/

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {ListUserChatContainer} from 'features/list-user-chat/view/list-user-chat.screen';

const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const ListUserChatScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUserChatContainer);
