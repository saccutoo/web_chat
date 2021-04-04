import React, { PureComponent } from 'react';
import { StyleSheet, TextInput, View, Platform, Text, TouchableOpacity } from 'react-native';
import { TextFieldProps } from './text-field.props';
import { TextFieldState } from './text-field.state';
import { SvgXml } from 'react-native-svg';
import colors from 'res/colors';
import svgs from 'res/svgs';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import { HyperUtils } from 'core/common/hyper-utils';
import { placeholder } from 'i18n-js';
export class TextField extends PureComponent<TextFieldProps, TextFieldState> {
  constructor(props: TextFieldProps) {
    super(props);

    this.state = {
      value: props.defaultValue || '',
      showPass: false,
      borderInputColor: '#E6E8EB',
      errorInput: false,
    };
  }

  onBlurInput = () => {
    this.setState({
      borderInputColor: '#E6E8EB',
      // errorInput: false,
    });
  };

  onFocusInput = () => {
    this.setState({
      borderInputColor: '#4080FF',
    });
  };

  onChangeText = (value: string) => {
    this.setState({
      value: value,
      errorInput: false,
    });

    this.props.onChangeValue?.(value);
    // if (!value) {
    //   this.onShowError(true);
    // } else {
    //   this.onShowError(false);
    // }
  };

  onShowPass = () => {
    this.setState({
      showPass: !this.state.showPass,
    });
  };

  onShowError = (isError: boolean) => {
    // this.setState({
    //   errorInput: isError,
    // });
  };

  render() {
    const { value, showPass, errorInput } = this.state;
    const {
      placeHolderColor,
      inputStyle,
      onChangeValue,
      lable,
      iConRight,
      onPressIconR,
      containerStyle,
      passInput,
      errorTxt,
      placeHolderText,
      // errorInput,
      isDomain,
    } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.wrapLable}>
          <Text style={styles.lable}>{lable}</Text>
        </View>
        <View
          style={[
            styles.containerInput,
            { borderColor: errorInput ? '#FF4D54' : this.state.borderInputColor },
          ]}
        >
          <View style={[styles.wrapInput]}>
            <TextInput
              autoCapitalize="none"
              defaultValue={value}
              placeholderTextColor={placeHolderColor || colors.dim}
              {...this.props}
              style={[styles.input, inputStyle]}
              onChangeText={this.onChangeText}
              secureTextEntry={!showPass && passInput}
              onBlur={this.onBlurInput}
              onFocus={this.onFocusInput}
              placeholder={placeHolderText}
            />
          </View>
          {iConRight ? (
            <HyperButtonComponent
              onPress={onPressIconR}
              containerStyles={{ padding: 4 }}
              img={iConRight}
              imgWidth={20}
              imgHeight={20}
            />
          ) : null}
          {passInput ? (
            <HyperButtonComponent
              onPress={this.onShowPass}
              containerStyles={{ padding: 4 }}
              img={showPass ? svgs.ic_pass_show : svgs.ic_pass_hide}
              imgWidth={20}
              imgHeight={20}
            />
          ) : null}
          {/* {isDomain ? <Text style={styles.txtDomain}>.ihcm.vn</Text> : null} */}
        </View>
        {errorInput ? (
          <Text style={{ fontSize: 12, color: colors.errorRed, marginTop: 4 }}>{errorTxt}</Text>
        ) : null}
      </View>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  wrapInput: {
    flex: 1,
    marginVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  input: {
    color: '#1A2948',
    fontSize: 14,
  },
  containerInput: {
    flexDirection: 'row',
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E6E8EB',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  wrapLable: {
    width: '100%',
  },
  lable: {
    color: '#1A2948',
    fontSize: 14,
    fontWeight: '500',
  },
  txtDomain: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.primaryColor,
    marginLeft: 8,
  },
});
