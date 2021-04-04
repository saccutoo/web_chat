import { APP_CONFIGS } from 'core/common/app-config';
import { HyperUtils } from 'core/common/hyper-utils';
import { ENUM_KIND_OF_NOTIFICATION } from 'core/common/types/notification';
import moment from 'moment';
import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ListNotificationItemProps } from './list-notification-item.props';

interface State {
  icon: any;
}

export class ListNotificationItemComponent extends React.PureComponent<
  ListNotificationItemProps,
  State
> {
  constructor(props: ListNotificationItemProps) {
    super(props);
    this.state = {
      icon: null,
    };
  }

  componentDidMount() {
    switch (this.props.item.type) {
      case ENUM_KIND_OF_NOTIFICATION.LIKE:
        this.setState({
          icon: require('../assets/like.png'),
        });
        break;

      case ENUM_KIND_OF_NOTIFICATION.REPLY:
        this.setState({
          icon: require('../assets/mention.png'),
        });
        break;
      case ENUM_KIND_OF_NOTIFICATION.KICKED:
        this.setState({
          icon: require('../assets/signout.png'),
        });
        break;
      case ENUM_KIND_OF_NOTIFICATION.REPLY:
        this.setState({
          icon: require('../assets/reply.png'),
        });
        break;
    }
  }

  //   measureView(event: any) {
  //     console.log(`*** event: ${JSON.stringify(event.nativeEvent)}`);
  //     // you'll get something like this here:
  //     // {"target":1105,"layout":{"y":0,"width":256,"x":32,"height":54.5}}
  //     console.log('position:', 'x:', event.nativeEvent.layout.x, 'y:', event.nativeEvent.layout.y);
  //   }

  // reder name group
  //   renderNameGroup = () => {
  //     if (this.props.group_name != null) {
  //       return <Text>"{this.props.group_name}"</Text>;
  //     } else return null;
  //   };

  // onMenuItem press

  onMenItemPress = (e: any) => {
    {
      console.log('touchMove', e.nativeEvent.pageY, '_', e.nativeEvent.pageX);
    }
  };

  // onPress menu btn
  //  onMenuPress = (e:any) =>{
  //     this.props.onMenuPress(e.nativeEvent.pageX,e.nativeEvent.pageY)

  //  }

  render() {
    const { item } = this.props;
    return (
      <View
        style={[styles.container, { backgroundColor: item.isRead ? '#fff' : '#F5F8FB' }]}
        //  onLayout = {(e) => {this.measureView(e)}}
      >
        <View style={styles.avatar_container}>
          {item.user.avatar != null ? (
            <Image
              source={{
                uri: APP_CONFIGS.SERVER_FILE + item.user.avatar,
              }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatar_container}>
              <Text style={{ color: Colors.primaryColor, fontSize: 24, fontWeight: '500' }}>
                {HyperUtils.capitalFirstCharacter(item?.user.userName)}
              </Text>
            </View>
          )}

          <Image source={this.state.icon} style={styles.icon} />
        </View>
        <View style={styles.notification_container}>
          <Text numberOfLines={2} style={styles.user_name}>
            {item.user.userName}{' '}
            <Text style={styles.notification}>
              {item.content}
              {/* {this.renderNameGroup()} */}
            </Text>
          </Text>
          <Text style={styles.time}> {moment(item.createdAt).fromNow()}</Text>
        </View>
        {/* <View
        //    onTouchStart={(e) => this.onMenItemPress(e) }
        //    onLayout = {(e) => {this.measureView(e)}}
        >
          <TouchableOpacity
          // onPress = {(e) => this.onMenuPress(e)}
          // onLayout = {(e) => {this.measureView(e)}}
          >
            <Image
              source={{
                uri:
                  'https://envato-shoebox-0.imgix.net/cda6/b5e2-876c-4ae1-ac70-57d8ace98f13/Grapefruit+slice-51-Edit+copy.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=709ae33303bb9253e5f323a6942cd0e7',
              }}
              style={styles.notification_btn}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 95,
  },
  avatar_container: {
    flexDirection: 'row',
    height: 48,
    width: 48,
  },

  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  icon: {
    height: 18,
    width: 18,
    borderRadius: 9,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  notification_container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  user_name: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 23,
    paddingHorizontal: 4,
  },
  notification: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 23,
  },
  time: {
    fontSize: 14,
    lineHeight: 21,
    color: '#808999',
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  notification_btn: {
    width: 24,
    height: 24,
  },
});
