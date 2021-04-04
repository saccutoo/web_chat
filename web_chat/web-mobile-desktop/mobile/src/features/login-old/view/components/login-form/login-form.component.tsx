/* 
    Created by thaolt
*/

import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import React, { PureComponent } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import colors from 'res/colors';
import { translate } from 'res/languages';
import { DimensionHelpers } from '../../../../../helpers/dimension-helpers';
import { LoginFormAdapter } from './login-form.adapter';
import { LoginFormProps } from './login-form.props';
import { TextField } from '/libraries/text-field/text-field';
import images from 'res/images';
import { SvgXml } from 'react-native-svg';
import svgs from 'res/svgs';

export class LoginFormComponent extends PureComponent<LoginFormProps, { infoDomain: string }> {
  refTxtUsername = React.createRef<TextField>();
  refTxtPass = React.createRef<TextField>();

  private LoginFormAdapter: LoginFormAdapter;
  constructor(props: LoginFormProps) {
    super(props);
    this.LoginFormAdapter = new LoginFormAdapter(this);
    this.state = {
      infoDomain: '',
    };
  }

  componentDidMount = () => {
    this.LoginFormAdapter.getDomain();
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={{ width: DimensionHelpers.width, paddingHorizontal: 32 }}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.logo} source={images.ic_logo} />
            <View style={styles.wrapDomain}>
              <SvgXml width={24} height={24} xml={svgs.ic_earth} />
              <Text style={styles.txtDomain}>{this.state.infoDomain}</Text>
            </View>
            <TextField
              containerStyle={{ marginTop: 32 }}
              ref={this.refTxtUsername}
              lable={translate('login.labEmail')}
              placeholder={translate('login.lblUsername')}
              defaultValue="chat.app2@hyperlogy.com"
              errorTxt={translate('error.errorEmail')}
            />
            <TextField
              containerStyle={{ marginTop: 32 }}
              ref={this.refTxtPass}
              placeholder={translate('login.lblPass')}
              defaultValue="Hyper@123"
              lable={translate('login.labPass')}
              passInput={true}
              errorTxt={translate('error.errorPass')}
            />
            <HyperButtonComponent
              containerStyles={styles.signIn}
              onPress={this.LoginFormAdapter.getFormValue}
              text={translate('login.btnLogin')}
              textStyle={styles.textSign}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.statusBar,
  },

  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E6E8EB',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 50,
    backgroundColor: '#115DD3',
  },
  textSign: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  logo: {
    width: 120,
    height: 120,
  },
  wrapDomain: {
    flexDirection: 'row',
    height: 65,
    width: '100%',
    backgroundColor: '#F5F8FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E8EB',
  },
  txtDomain: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.primaryColor,
    marginLeft: 8,
  },
});
