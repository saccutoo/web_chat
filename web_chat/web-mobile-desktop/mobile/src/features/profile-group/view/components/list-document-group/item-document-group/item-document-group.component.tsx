import { GetAttachmentGroupRes } from 'core/common/types/base-response';
import moment from 'moment';
import * as React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import svgs from 'res/svgs';
import { ItemDocumentGroupProps } from './item-document-group.props';

export class ItemDocumentGroupComponent extends React.PureComponent<ItemDocumentGroupProps> {
  // press dowload button
  onDowloadPress = () => {
    Alert.alert('Press dowload');
  };

  // reder header

  rederHeader = (item: GetAttachmentGroupRes ) => {
    // custom moment locale -
    moment.locale('vi', {
      calendar: {
        lastDay: function () {
          return '[Yesterday]';
        },
        sameDay: function () {
          return '[Today]';
        },
        nextDay: function () {
          return '[Tomorrow]';
        },
        sameElse: function () {
          return 'l';
        },
        lastWeek: function () {
          return 'l';
        },
        nextWeek: function () {
          return 'l';
        },
      },
    });

    // View header
    const date = moment(item.createdAt).calendar();

    if (true) {
      return (
        <View style={styles.header}>
          <View style={styles.line} />
          <Text style={styles.header_text}> {date} </Text>
          <View style={styles.line} />
        </View>
      );
    }
    return null;
  };
  render() {
      const {item} = this.props
    return (
      <View>
        {this.rederHeader(item)}
        <View style={styles.container}>
          {/* <Image style={styles.gim_image} source={require('../assert/gimfile.png')} /> */}
          <View style={styles.gim_image}>
            <SvgXml height={24} width={24} xml={svgs.ic_gim} />
          </View>
          <View style={styles.file_des_container}>
            <Text style={styles.fileName} numberOfLines = {1}>{item.name}</Text>
            <Text style={styles.fileSize}> {item.fileSize} kb </Text>
          </View>
          <TouchableOpacity
            style={styles.dowload_image_container}
            onPress={() => this.onDowloadPress()}
          >
            <SvgXml height={24} width={24} xml={svgs.ic_dowload_blue} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 59,
    backgroundColor: 'rgba(238, 240, 247, 0.25)',
    borderColor: 'rgba(179, 184, 194, 0.25)',
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: 'stretch',
    marginBottom: 12,
    alignItems: 'center'
  },
  gim_image: {
    height: 32,
    width: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10
  },
  file_des_container: {
    flex: 1,
    marginLeft: 25,
  },

  fileName: {
    fontSize: 14,
    height: 21,
    color: '#1A2948',
    fontFamily: 'Roboto',
    marginTop: 10,
  },
  fileSize: {
    fontSize: 12,
    height: 18,
    fontFamily: 'Roboto',
    color: '#808999',
  },
  dowload_image_container: {
    width: 36,
    height: 36,
    marginRight: 10,
    marginTop: 11,
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: '#EEF0F7',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  dowload_image: {
    width: 24,
    height: 24,
    marginTop: 6,
  },

  header: {
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },

  header_text: {
    fontSize: 12,
    color: '#808999',
  },
  line: {
    borderColor: '#E6E8EB',
    borderWidth: 1,
    flex: 1,
  },
});
