/* 
    Created by longdq
*/

import ChatDetailContainer from 'features/chat-detail/view/chat-detail.screen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  
});

export const ChatDetailScreen = connect(mapStateToProps, mapDispatchToProps)(ChatDetailContainer);
