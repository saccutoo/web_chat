import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ToolbarProps } from './toolbar.props';

export class ToolbarComponent extends React.PureComponent<ToolbarProps> {
  constructor(props: ToolbarProps) {
    super(props);
  }

  render() {
      const {goBack} = this.props
    return (
      <View style={styles.toolbarContainer}>
        <TouchableOpacity
        onPress={ () => goBack()}
        >
          <Image source={require('../list-notification/assets/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}> Thông Báo </Text>
        <TouchableOpacity
        // onPress={(e) => this.MenuPress(e)}
        >
          <Image source={require('../list-notification/assets/menu.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbarContainer: {
    height: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    height: 24,
    width: 24,
  },
  title: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});
