/* 
    Created by longdq
*/

import {ProfileContainer} from 'features/profile/view/profile.screen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { removeUserInfoAction } from 'core/common/redux/actions';

const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeUserInfoAction: () => {
    dispatch(removeUserInfoAction());
  },
});

export const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
