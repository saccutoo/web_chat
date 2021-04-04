/* 
    Created by thaolt
*/

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { LoginOldAdapter } from 'features/login-old/model-login-old/login-old.adapter';
import { LoginOldProps } from 'features/login-old/model-login-old/login-old.props';
import { LoginOldStates } from 'features/login-old/model-login-old/login-old.states';
import { LoginFormWvComponent } from './components/login-form-wv/login-form-wv.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

export default class LoginOldContainer extends React.PureComponent<LoginOldProps, LoginOldStates> {
  refLoginFormWvComponent = React.createRef<LoginFormWvComponent>();
  LoginOldAdapter: LoginOldAdapter;
  //Local States

  constructor(props: LoginOldProps) {
    super(props);
    this.LoginOldAdapter = new LoginOldAdapter(this);
    this.state = {};
    console.log('test_handleLocalizationChange_login_old');
  }

  render() {
    const { loginMobile } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {/* Form custom user */}
        <LoginFormComponent loginSSO={this.LoginOldAdapter.loginSSO} />
        {/* Form webview */}
        {/* <LoginFormWvComponent ref={this.refLoginFormWvComponent} loginMobile={loginMobile} /> */}
        {/* </ImageBackground> */}
      </View>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
