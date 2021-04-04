/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { MoveLanguageProps } from './move-language.props';
import { MoveLanguageAdapter } from './move-language.adapter';
import { SvgXml } from 'react-native-svg';
import svgs from 'res/svgs';
import images from 'res/images';
import colors from 'res/colors';

export class MoveLanguageComponent extends PureComponent<MoveLanguageProps, { language: string }> {
  private MoveLanguageAdapter: MoveLanguageAdapter;
  constructor(props: MoveLanguageProps) {
    super(props);
    this.MoveLanguageAdapter = new MoveLanguageAdapter(this);
    this.state = {
      language: 'VN',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              language: 'VN',
            });
          }}
        >
          <View
            style={[
              styles.wrapItem,
              { borderColor: this.state.language === 'VN' ? colors.primaryColor : '#fff' },
            ]}
          >
            <Image source={images.ic_VN} style={styles.img} />
            <Text style={styles.txt}>VN</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => {
            this.setState({
              language: 'ENG',
            });
          }}
        >
          <View
            style={[
              styles.wrapItem,
              { borderColor: this.state.language === 'ENG' ? colors.primaryColor : colors.white },
            ]}
          >
            <Image source={images.ic_Eng} style={styles.img} />
            <Text style={styles.txt}>EN</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 36,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapItem: {
    width: 76,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
  },
  img: {
    width: 24,
    height: 24,
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4D5971',
    marginLeft: 6,
  },
});
