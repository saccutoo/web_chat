
/* 
    Created by longdq
*/

import {ProfileGroupContainer} from 'features/profile-group/view/profile-group.screen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: any) => ({
   userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
   
});

export const ProfileGroupScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileGroupContainer)


