import { LoginMobileRequest, LoginMobileResponse } from './view/components/login-form-wv/login-form-wv.props';
/* 
    Created by thaolt
*/

import LoginOldContainer from 'features/login-old/view/login-old.screen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { loginMobileAction } from '../../core/common/redux/actions/user.actions';

const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginMobile: (data: LoginMobileRequest) => {
    dispatch(loginMobileAction(data));
  },
});

export const LoginOldScreen = connect(mapStateToProps, mapDispatchToProps)(LoginOldContainer);
