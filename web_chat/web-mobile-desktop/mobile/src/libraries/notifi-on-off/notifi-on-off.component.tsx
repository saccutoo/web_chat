/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';
import { NotifiOnOffProps } from './notifi-on-off.props';
import { NotifiOnOffAdapter } from './notifi-on-off.adapter';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import svgs from 'res/svgs';
import { SvgXml } from 'react-native-svg';
import colors from 'res/colors';
import { translate } from 'res/languages';

export class NotifiOnOffComponent extends PureComponent<NotifiOnOffProps, { isEnabled: boolean }> {
  private NotifiOnOffAdapter: NotifiOnOffAdapter;
  constructor(props: NotifiOnOffProps) {
    super(props);
    this.NotifiOnOffAdapter = new NotifiOnOffAdapter(this);
    this.state = {
      isEnabled: false,
    };
  }

  toggleSwitch = () => {
    this.setState({
      isEnabled: !this.state.isEnabled,
    });
  };

  render() {
    const { isEnabled } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <SvgXml width={40} height={40} xml={svgs.ic_bell} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.txt}>{translate('notifi.noti')}</Text>
            <Text style={styles.txtStatus}>{this.state.isEnabled ? 'on' : 'off'}</Text>
          </View>
        </View>
        <Switch
          trackColor={{ false: colors.bgGray, true: '#33CC5E' }}
          thumbColor={isEnabled ? '#fff' : '#fff'}
          ios_backgroundColor={colors.bgGray}
          onValueChange={this.toggleSwitch}
          value={isEnabled}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    color: colors.txtColor,
    fontWeight: '500',
  },
  txtStatus: {
    fontSize: 12,
    color: '#667085',
    marginTop: 2,
  },
});
