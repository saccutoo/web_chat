/* 
    Created by thaolt at 06-12-2020 17:50:07
*/

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { saveUserInfoAction } from 'core/common/redux/actions';
import RootComponent from './view/root-component';
import { LoginMobileResponse } from '../login-old/view/components/login-form-wv/login-form-wv.props';

const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveUserInfoAction: (data: LoginMobileResponse) => {
    dispatch(saveUserInfoAction(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);
