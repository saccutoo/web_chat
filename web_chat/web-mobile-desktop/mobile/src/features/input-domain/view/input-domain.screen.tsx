/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, Platform } from 'react-native';
import { ContainerComponent } from 'libraries/main/container/container.component';
import { InputDomainAdapter } from 'features/input-domain/model-input-domain/input-domain.adapter';
import { InputDomainProps } from 'features/input-domain/model-input-domain/input-domain.props';
import { InputDomainStates } from 'features/input-domain/model-input-domain/input-domain.states';
import images from 'res/images';
import { HeaderTypes } from 'types/header-types';
import colors from 'res/colors';
import { TextField } from 'libraries/text-field/text-field';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import { translate } from 'res/languages';
import { MoveLanguageComponent } from 'libraries/move-language/move-language.component';
import { NativeModules } from 'react-native';
const screenWidth = Dimensions.get('window').width;

export default class InputDomainContainer extends React.PureComponent<
  InputDomainProps,
  InputDomainStates
> {
  InputDomainAdapter: InputDomainAdapter;
  //Local States
  refTxtInputDomain = React.createRef<TextField>();

  constructor(props: InputDomainProps) {
    super(props);
    this.InputDomainAdapter = new InputDomainAdapter(this);
    this.state = {
      txtIpnut: '',
      errorTxt: '',
      errorInput: false,
    };
    if (Platform.OS === 'android') {
      // NativeModules.AwakeModule.show('Message coming 123sa đá', 500);
      NativeModules.AwakeModule.activate();
      // NativeModules.AwakeModule.deactivate();
    }
  }

  render() {
    return (
      <ContainerComponent style={styles.container} headerType={HeaderTypes.NONE}>
        <View style={styles.container}>
          <View style={styles.wrapLogo}>
            <Image source={images.ic_logo} />
          </View>
          <Text style={styles.title}>{translate('inputDomain.title')}</Text>
          <View style={styles.wrapInput}>
            <TextField
              placeHolderText={translate('inputDomain.placeHoder')}
              placeHolderColor="#99A0AD"
              lable={translate('inputDomain.lable')}
              errorTxt={this.state.errorTxt}
              ref={this.refTxtInputDomain}
              defaultValue="demo10.ihcm.vn"
              // onChangeValue={(txt) => this.InputDomainAdapter.onChangeText(txt)}
              // errorInput={this.state.errorInput}
              isDomain
            />
          </View>
          <HyperButtonComponent
            containerStyles={styles.btn}
            text={translate('inputDomain.txtBtn')}
            textStyle={styles.txtBtn}
            onPress={this.InputDomainAdapter.checkDomain}
          />
          <View style={{ marginTop: 32 }}>
            <MoveLanguageComponent />
          </View>
        </View>
      </ContainerComponent>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapLogo: {
    height: 120,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 42,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: colors.txtColor,
    marginTop: 40,
    textAlign: 'center',
  },
  wrapInput: {
    marginTop: 32,
    marginHorizontal: 32,
  },
  btn: {
    height: 44,
    width: screenWidth - 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 32,
    marginTop: 32,
    backgroundColor: colors.primaryColor,
    borderRadius: 8,
  },
  txtBtn: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
  },
});
