/* 
    Created by thaolt
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { OutgoingFooterProps } from './outgoing-footer.props';
import { OutgoingFooterAdapter } from './outgoing-footer.adapter';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import { translate } from 'res/languages';
import svgs from 'res/svgs';

export class OutgoingFooterComponent extends PureComponent<OutgoingFooterProps> {
  private OutgoingFooterAdapter: OutgoingFooterAdapter;
  constructor(props: OutgoingFooterProps) {
    super(props);
    this.OutgoingFooterAdapter = new OutgoingFooterAdapter(this);
  }

  render() {
    const { onFinishCall } = this.props;
    return (
      <View style={styles.wrapBottom}>
        <View>
          <HyperButtonComponent
            imgWidth={64}
            imgHeight={64}
            img={svgs.ic_call_deny}
            onPress={onFinishCall}
          />
          <Text style={styles.wrapTxtIcon} />
        </View>
        {/* <View style={{ marginLeft: 85 }}>
          <HyperButtonComponent
            imgWidth={64}
            imgHeight={64}
            img={svgs.ic_call_video}
            onPress={() => console.log('hehe')}
          />
          <Text style={styles.wrapTxtIcon}>{translate('videoCall.rep')}</Text>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  wrapBottom: {
    bottom: 54,
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapTxtIcon: {
    fontSize: 14,
    color: '#fff',
    marginTop: 12,
    textAlign: 'center',
  },
});
