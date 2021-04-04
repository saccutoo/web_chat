/* 
    Created by thaolt
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { IncommingFooterProps } from './incomming-footer.props';
import { IncommingFooterAdapter } from './incomming-footer.adapter';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import svgs from 'res/svgs';
import { translate } from 'res/languages';

export class IncommingFooterComponent extends PureComponent<IncommingFooterProps> {
  private IncommingFooterAdapter: IncommingFooterAdapter;
  constructor(props: IncommingFooterProps) {
    super(props);
    this.IncommingFooterAdapter = new IncommingFooterAdapter(this);
  }

  render() {
    const {onCancel, onAnswer} = this.props
    return (
      <View style={styles.wrapBottom}>
        <View>
          <HyperButtonComponent
            imgWidth={64}
            imgHeight={64}
            img={svgs.ic_call_cancel}
            onPress={onCancel}
          />
          <Text style={styles.wrapTxtIcon}>{translate('videoCall.cancel')}</Text>
        </View>
        <View style={{ marginLeft: 85 }}>
          <HyperButtonComponent
            imgWidth={64}
            imgHeight={64}
            img={svgs.ic_call_video}
            onPress={onAnswer}
          />
          <Text style={styles.wrapTxtIcon}>{translate('videoCall.rep')}</Text>
        </View>
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
