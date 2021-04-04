
/* 
    Created by longdq
*/

import {IncomingCallContainer} from 'features/incoming-call/view/incoming-call.screen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: any) => ({
    userInfo: state.userInfo?.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
   
});

export const IncomingCallScreen = connect(mapStateToProps, mapDispatchToProps)(IncomingCallContainer)


