/* 
    Created by thaolt
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ReplyMessageProps } from './reply-message.props';
import { ReplyMessageAdapter } from './reply-message.adapter';
import svgs from '../../../../../../../res/svgs';
import { SvgXml } from 'react-native-svg';

export class ReplyMessageComponent extends PureComponent<ReplyMessageProps> {
  private ReplyMessageAdapter: ReplyMessageAdapter;
  constructor(props: ReplyMessageProps) {
    super(props);
    this.ReplyMessageAdapter = new ReplyMessageAdapter(this);
  }

  checkView = () => {
    const {image, message} = this.props
    if (image != null && message != null) {
      return (
        <View>
          <Text numberOfLines={1} style={styles.message}>
            {message}
          </Text>
          <Image source={image} style={styles.imgMessage}></Image>
        </View>
      );
    } else if (image == null && message != null) {
      return (
        <Text numberOfLines={1} style={styles.message}>
          {message}
        </Text>
      );
    } else if (message == null && image != null) {
      return <Image source={image} style={styles.imgMessage}></Image>;
    } else {
      return null;
    }
  };

  render() {
    const { userName, message, image, onHideFooter } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.replytitleContainer}>
            <Text style={styles.replyTitle}>Trả lời </Text>
            <Text style={styles.replyUserName} numberOfLines={1}>
              {' '}
              {userName}{' '}
            </Text>
          </View>
          <TouchableOpacity style={styles.btnDeleteContainer} onPress={onHideFooter}>
            <SvgXml width={24} height={24} xml={svgs.actionMenu.ic_close_footer} />
            {/* <Image source={require('../../assert/close.png')} style={styles.btnDelete}></Image> */}
          </TouchableOpacity>
        </View>
        {this.checkView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingLeft: 16,
    paddingBottom: 12,
    marginTop: 10,
  },

  headerContainer: {
    flexDirection: 'row',
  },
  replytitleContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    flex: 1,
  },
  replyTitle: {
    // fontFamily: 'Roboto',
    fontSize: 12,
    color: '#4D5971',
    height: 18,
    marginRight: 5,
  },
  replyUserName: {
    // fontFamily: 'Roboto',
    fontSize: 12,
    color: '#4D5971',
    height: 18,
    fontWeight: 'bold',
  },

  message: {
    // fontFamily: 'Roboto',
    fontSize: 14,
    color: '#1A2948',
    marginTop: 6,
    marginBottom: 4,
    marginRight: 16,
  },

  btnDeleteContainer: {
    paddingTop: 6,
    paddingEnd: 16,
  },

  btnDelete: {
    width: 24,
    height: 24,
  },

  imgMessage: {
    height: 80,
    width: 80,
  },
});
