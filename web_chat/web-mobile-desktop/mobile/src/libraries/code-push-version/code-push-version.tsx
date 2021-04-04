import * as React from 'react';
import { StyleSheet, Text, Alert, View } from 'react-native';
import codePush, { LocalPackage } from 'react-native-code-push';
import colors from 'res/colors';
import { translate } from '../../res/languages';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import { HyperUtils } from '../../core/common/hyper-utils';
import env from 'react-native-config';

interface Props {}

interface State {
  res?: LocalPackage;
}

export default class CodePushVerion extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      res: undefined,
    };
  }

  public componentDidMount(): void {
    if (__DEV__) return;
    this.onFetchInfoCodePush();
  }

  private onFetchInfoCodePush() {
    codePush
      .getUpdateMetadata()
      .then((res: any) => {
        console.log('code-push-info: ', res);
        this.setState({ res });
      })
      .catch((err) => {
        console.log('code-push-info-err: ', err);
      });
  }

  showVersion = () => {
    const { res } = this.state;
    let info = `Host: ${env.REACT_APP_IP_ADDRESS_API} :${env.REACT_APP_IP_ADDRESS_PORT} \nPush stream: ${env.REACT_APP_PUSH_STREAM_IP}:${env.REACT_APP_PUSH_STREAM_PORT}`;
    if (!HyperUtils.isEmpty(res)) {
      info += `\n\nVersion: ${res.appVersion} (${res.label})\n`;
    }
    Alert.alert('Thông Tin Phiên Bản', info, [{ text: 'OK' }], {
      cancelable: true,
    });
  };

  public render(): React.ReactNode | null {
    const { res } = this.state;
    return (
      <View style={styles.container}>
        <HyperButtonComponent
          onPress={this.showVersion}
          containerStyles={{ padding: 12 }}
          text={translate('profile.version')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    // backgroundColor: 'grey',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
  },
  txtVersion: {
    textAlign: 'right',
    marginRight: 12,
    color: colors.grey700,
    fontSize: 12,
    marginBottom: 2,
  },
});
