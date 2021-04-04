import * as React from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import svgs from 'res/svgs';
import { ItemLinkGroupProps } from './item-link-group.props';

export class ItemLinkGroupComponent extends React.PureComponent<ItemLinkGroupProps> {
  constructor(props: ItemLinkGroupProps) {
    super(props);
  }

  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.link_img_container}>
          <SvgXml height={24} width={24} xml={svgs.ic_earth} />
        </View>
        <View>
          <Text style={styles.link_title}> Link </Text>
          <Text style={styles.link} onPress={() => Linking.openURL(item.message)}>
            {' '}
            {item.message}{' '}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 16,
    marginRight: 16,
  },
  link_img_container: {
    width: 59,
    height: 56,
    borderRadius: 6,
    backgroundColor: 'rgba(238, 240, 247, 0.25)',
    borderColor: 'rgba(179, 184, 194, 0.25)',
    borderWidth: 1,
    alignItems: 'center',
    marginRight: 12,
    display: 'flex',
    justifyContent: 'center',
  },
  link_img: {
    width: 23,
    height: 24,
    marginTop: 16,
  },

  link_title: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: '#1A2948',
    alignItems: 'center',
    marginBottom: 4,
  },
  link: {
    fontSize: 14,
    height: 21,
    fontFamily: 'Roboto',
    color: '#4080FF',
  },
});
