/* 
    Created by longdq
*/

import React, { PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListUserItemAdapter } from './list-user-item.adapter';
import { ListUserItemProps } from './list-user-item.props';

export class ListUserItemComponent extends PureComponent<ListUserItemProps> {
  private ListUserItemAdapter: ListUserItemAdapter;
  constructor(props: ListUserItemProps) {
    super(props);
    this.ListUserItemAdapter = new ListUserItemAdapter(this);
  }

  render() {
  
    
    const { item, goToChatDetail } = this.props;
    console.log('LIST USER ITEM: ',item);
    return (
      <View>
        <TouchableOpacity
          onPress={() => goToChatDetail(item)}
          activeOpacity={0.8}
          key={item.id}
          style={styles.userItemStyle}
        >
          <Image
            style={styles.userImgStyle}
            source={{
              uri: 'https://placeimg.com/128/128/any',
            }}
          />
          <Text style={styles.userTextStyle} numberOfLines={1}>
            {item && item.userName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userItemStyle: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    //justifyContent: 'center',
    width: 80,
    height: 90,
  },
  userImgStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userTextStyle: {
    marginTop: 5,
    textAlign: 'center',
  },
});
