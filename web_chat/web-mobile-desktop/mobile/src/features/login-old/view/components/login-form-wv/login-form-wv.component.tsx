/* 
    Created by thaolt
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { LoginFormWvProps } from './login-form-wv.props';
import { WebView, WebViewNavigation, WebViewMessageEvent } from 'react-native-webview';
import { LoginFormWvComponentAdapter } from './login-form-wv.adapter';

export class LoginFormWvComponent extends PureComponent<LoginFormWvProps> {
  refWebEl = React.createRef<WebView>();
  LoginFormWvComponentAdapter: LoginFormWvComponentAdapter;
  constructor(props: LoginFormWvProps) {
    super(props);
    this.LoginFormWvComponentAdapter = new LoginFormWvComponentAdapter(this);
  }

  render() {
    return (
      <View style={{ width: 0, height: 0 }}>
        <WebView
          onError={({ nativeEvent }) => {
            Alert.alert('Error', JSON.stringify(nativeEvent, null, 2), [{ text: 'OK' }], {
              cancelable: true,
            });
          }}
          // ref={webview => {
          //   this.webview = webview;
          // }}
          ref={this.refWebEl}
          // style={{width:0, height:0}}
          style={{ backgroundColor: 'grey' }}
          source={{
            uri:
              'https://sso.hyperlogy.com/cas/login?service=https%3A%2F%2Fhyperlogy.ihcm.vn%2Fihcm%2F',
            // 'https://sso.hyperlogy.com/cas/login?service=https%3A%2F%2Fdemo10.ihcm.vn%2Fihcm%2Fapi/auth/validateCasTicket/',
          }}
          // injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled={true}
          onMessage={this.LoginFormWvComponentAdapter.onMessage}
          onNavigationStateChange={this.LoginFormWvComponentAdapter.onNavigationStateChange}
          incognito={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

const INJECTED_JAVASCRIPT = `
  window.parseToJson=function(data){
    return JSON.parse(data.replace(/^"|"$/,"'"));
  }
  true;
`;
