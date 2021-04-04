/* 
    Created by longdq
*/

import VideoCallContainer from 'features/video-call/view/video-call.screen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const VideoCallScreen = connect(mapStateToProps, mapDispatchToProps)(VideoCallContainer);
