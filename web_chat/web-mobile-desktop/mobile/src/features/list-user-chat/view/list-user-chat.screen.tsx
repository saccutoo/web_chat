/* 
    Created by longdq
*/

import EventBus, { EventBusName, EventBusType } from 'core/common/event-bus';
import ContainerComponent from 'libraries/main/container/container.component';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';
import { Subscription } from 'rxjs';
import { HeaderTypes } from 'types/header-types';
import { INewUserChat } from 'core/common/types/message';
import { User } from '../../../core/common/types/user';
import { ListUserChatProps, ListChatModel } from 'core/model-list-user-chat/list-user-chat.props';
import { ListChatComponent } from './components/list-chat/list-chat.component';
import { SearchTouchComponent } from './components/search-touch/search-touch.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import NavigationService from 'routers/navigation-service';
import { TypeParam } from 'core/model-chat-detail/chat-detail.props';
import AsyncStorageHelpers, { StorageKey } from 'helpers/async-storage-helpers';
import {
  ChatDetailScreen,
  IncomingCallScreen,
  NewMessageScreen,
  NotificationScreen,
  ProfileScreen,
  SearchScreen,
} from 'routers/screen-name';
import ListUserChatAdapter from 'core/model-list-user-chat/list-user-chat.adapter';
// import RoomChatAdapter from 'worktalk-core/dist/model-room-chat/room-chat.adapter';
import { pushStreamService } from 'core/common/push-stream-service';
import { processRequestRespository } from 'core/common/networking/api-helper';
import { useEffect } from 'react';
import ListUserChatServices from 'core/model-list-user-chat/list-user-chat.services';
import { GetRoomChatRes } from 'core/common/types/base-response';

export const ListUserChatContainer = (props: ListUserChatProps) => {
  const { userInfo } = props;
  const {
    dataListChat,
    isLoading,
    page,
    isFinish,
    onEndReached,
    onRefresh,
    registerSubscriber,
    getListChat,
    getListUserSuccess,
  } = ListUserChatAdapter(props);

  // subscriptions = new Subscription();
  // focusListener: any;
  // page: number = 1;
  // ITEM_PAGE = 15;

  //Local States
  // constructor(props: ListUserChatProps) {
  //   super(props);
  //   this.ListUserChatAdapter = new ListUserChatAdapter(this);
  //   this.state = {
  //     dataListUser: [],
  //     dataListChat: [],
  //     loading: false,
  //   };
  //   console.log('test_list_user_chat: ', this.props.userInfo);
  // }

  // componentDidMount = () => {
  //   this.onEventBusSubscribe();
  //   const tmpUser = { ...userInfo?.user };
  //   // this.ListUserChatAdapter.getListUser();
  //   this.ListUserChatAdapter.getListChat();
  //   //TODO: video call
  //   this.getInfoVideoCall();
  // };

  // useEffect(() => {
  //   registerSubscriber;
  //   pushStreamService.subChat(userInfo?.user?.id);
  //   processRequestRespository(ListUserChatServices.getInstance().getListUser(), getListUserSuccess);
  //   getListChat();
  //   // getInfoVideoCall();
  // }, []);

  // Get info video call
  const getInfoVideoCall = async () => {
    console.log('test_video_call_0: ');
    const data: string = (await AsyncStorageHelpers.get(StorageKey.VIDEO_CALL_INFO)) as string;
    const info: any = JSON.parse(data);

    NavigationService.navigate(IncomingCallScreen, {
      type: info?.data?.type,
      user: JSON.parse(info?.data?.user || ''),
      chatInfo: JSON.parse(info?.data?.chatInfo || ''),
    });
    console.log('test_video_call: ', JSON.parse(info?.data?.user));
  };

  const goToProfile = () => {
    NavigationService.navigate(ProfileScreen, {
      user: userInfo.user,
    });
  };

  const goToSearch = () => {
    NavigationService.navigate(SearchScreen);
  };

  const goToNewMess = () => {
    NavigationService.navigate(NewMessageScreen);
  };

  const goToNotifi = () => {
    // NavigationService.navigate(IncomingCallScreen);
    NavigationService.navigate(NotificationScreen, {
      userInfo: userInfo,
    });
  };

  const goToChatDetail = (item: GetRoomChatRes) => {
    console.log('test_item_chat_dtl: ', item);
    NavigationService.navigate(ChatDetailScreen, {
      chatInfo: { data: item, type: TypeParam.FORM_MESSAGE },
    });
  };

  // getInfoVideoCall = async () => {
  //   console.log('test_video_call_0: ');
  //   const data: string = (await AsyncStorageHelpers.get(StorageKey.VIDEO_CALL_INFO)) as string;
  //   const info: any = JSON.parse(data);

  //   NavigationService.navigate(IncomingCallScreen, {
  //     type: info?.data?.type,
  //     user: JSON.parse(info?.data?.user || ''),
  //     chatInfo: JSON.parse(info?.data?.chatInfo || ''),
  //   });
  //   console.log('test_video_call: ', JSON.parse(info?.data?.user));
  // };

  return (
    <ContainerComponent headerType={HeaderTypes.NONE} style={{ flex: 1 }}>
      <UserInfoComponent
        userInfo={userInfo && userInfo.user}
        goToProfile={goToProfile}
        goToNewMess={goToNewMess}
        goToNotifi={goToNotifi}
      />
      <SearchTouchComponent goToSearch={goToSearch} />
      {/* <ListUserComponent
          dataListUser={dataListUser}
          goToChatDetail={this.ListUserChatAdapter.goToChatDetail}
        /> */}
      <ListChatComponent
        dataListChat={dataListChat}
        goToChatDetail={goToChatDetail}
        loading={isLoading}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        isFinish={isFinish}
      />
    </ContainerComponent>
  );
};

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// export default class ListUserChatContainer extends React.PureComponent<
//   ListUserChatProps,
//   ListUserChatStates
// > {
//   ListUserChatAdapter: ListUserChatAdapter;
//   subscriptions = new Subscription();
//   focusListener: any;
//   page: number = 1;
//   ITEM_PAGE = 15;

//   //Local States
//   constructor(props: ListUserChatProps) {
//     super(props);
//     this.ListUserChatAdapter = new ListUserChatAdapter(this);
//     this.state = {
//       dataListUser: [],
//       dataListChat: [],
//       loading: false,
//     };
//     console.log('test_list_user_chat: ', this.props.userInfo);
//   }

//   componentDidMount = () => {
//     this.onEventBusSubscribe();
//     const tmpUser = { ...this.props.userInfo?.user };
//     // this.ListUserChatAdapter.getListUser();
//     this.ListUserChatAdapter.getListChat();
//     //TODO: video call
//     this.getInfoVideoCall();
//   };

//   componentWillUnmount() {
//     this.subscriptions?.unsubscribe();
//   }

//   private onEventBusSubscribe = () => {
//     this.subscriptions.add(
//       EventBus.getInstance().events.subscribe((res: EventBusType) => {
//         if (res.payload) {
//           console.log('test_messageReceived_event_bus: ', res.payload);
//           switch (res.type) {
//             // TODO
//             // case EventBusName.INCOMING_MESSAGE:
//             //   const msg: IMessage = res.payload;
//             //   let new_data = [...this.state.dataListChat];
//             //   const index_item = new_data.map((item) => item?.id).indexOf(msg?.chatId);
//             //   if (index_item != -1 && new_data[index_item] && new_data[index_item].messengers[0]) {
//             //     const new_item = { ...new_data[index_item] };
//             //     new_item.messengers[0].message = msg?.text;
//             //     new_data.splice(index_item, 1);
//             //     new_data.splice(0, 0, new_item);
//             //   }
//             //   //Check new user
//             //   const exist_user = new_data.map((item) => item?.contact?.id).indexOf(msg?.user?._id);
//             //   if (exist_user === -1) {
//             //     this.ListUserChatAdapter.getListChat();
//             //     return;
//             //   }
//             //   //Sort
//             //   this.setState({
//             //     dataListChat: new_data,
//             //   });
//             //   break;
//             case EventBusName.INCOMING_MESSAGE:
//               const msg: IMessage = res.payload;
//               let new_data = [...this.state.dataListChat];
//               new_data.push(msg);
//               // const index_item = new_data.map((item) => item?.id).indexOf(msg?.chatId);
//               // if (index_item != -1 && new_data[index_item] && new_data[index_item].messengers[0]) {
//               //   const new_item = { ...new_data[index_item] };
//               //   new_item.messengers[0].message = msg?.text;
//               //   new_data.splice(index_item, 1);
//               //   new_data.splice(0, 0, new_item);
//               // }

//               //Check new user
//               // const exist_user = new_data.map((item) => item?.contact?.id).indexOf(msg?.user?._id);
//               // if (exist_user === -1) {
//               //   this.ListUserChatAdapter.getListChat();
//               //   return;
//               // }
//               //Sort
//               this.setState({
//                 dataListChat: new_data,
//               });
//               break;
//             case EventBusName.NEW_USER_CHAT:
//               const newUserChat: INewUserChat = res.payload;
//               //Check new user
//               const exist_user1 = this.state.dataListChat
//                 .map((item) => item?.contact?.id)
//                 .indexOf(newUserChat?.userId);
//               if (exist_user1 === -1) this.ListUserChatAdapter.getListChat();
//               break;
//             case EventBusName.UPDATE_STATUS_USER:
//               const user: User = res.payload;
//               let new_data_status = [...this.state.dataListChat];
//               const index_item_status = new_data_status
//                 .map((item) => item?.contact?.id)
//                 .indexOf(user.id);
//               if (index_item_status != -1 && new_data_status[index_item_status]) {
//                 const new_item = { ...new_data_status[index_item_status] };
//                 new_item.statusUser = user.statusUser;
//                 new_data_status.splice(index_item_status, 1, new_item);
//               }
//               this.setState({
//                 dataListChat: new_data_status,
//               });
//               break;
//             case EventBusName.RELOAD_LIST_CHAT:
//               this.ListUserChatAdapter.getListChat();
//               return;
//           }
//         }
//       })
//     );
//   };

//   goToProfile = () => {
//     NavigationService.navigate(ProfileScreen, {
//       user: this.props.userInfo.user,
//     });
//   };

//   goToSearch = () => {
//     NavigationService.navigate(SearchScreen);
//   };

//   goToNewMess = () => {
//     NavigationService.navigate(NewMessageScreen);
//   };

//   goToNotifi = () => {
//     // NavigationService.navigate(IncomingCallScreen);
//   };

//   goToChatDetail = (item: ListChatModel) => {
//     console.log('test_item_chat_dtl: ', item);
//     NavigationService.navigate(ChatDetailScreen, {
//       chatInfo: { data: item, type: TypeParam.FORM_MESSAGE },
//     });
//   };

//   getInfoVideoCall = async () => {
//     console.log('test_video_call_0: ');
//     const data: string = (await AsyncStorageHelpers.get(StorageKey.VIDEO_CALL_INFO)) as string;
//     const info: any = JSON.parse(data);

//     NavigationService.navigate(IncomingCallScreen, {
//       type: info?.data?.type,
//       user: JSON.parse(info?.data?.user || ''),
//       chatInfo: JSON.parse(info?.data?.chatInfo || ''),
//     });
//     console.log('test_video_call: ', JSON.parse(info?.data?.user));
//   };

//   render() {
//     const { dataListUser, dataListChat } = this.state;
//     const { userInfo } = this.props;
//     return (
//       <ContainerComponent headerType={HeaderTypes.NONE} style={{ flex: 1 }}>
//         <UserInfoComponent
//           userInfo={userInfo && userInfo.user}
//           goToProfile={this.goToProfile}
//           goToNewMess={this.goToNewMess}
//           goToNotifi={this.goToNotifi}
//         />
//         <SearchTouchComponent goToSearch={this.goToSearch} />
//         {/* <ListUserComponent
//           dataListUser={dataListUser}
//           goToChatDetail={this.ListUserChatAdapter.goToChatDetail}
//         /> */}
//         <ListChatComponent
//           dataListChat={dataListChat}
//           goToChatDetail={this.goToChatDetail}
//           loading={this.state.loading}
//           onEndReached={this.ListUserChatAdapter.onEndReached}
//           onRefresh={this.ListUserChatAdapter.onRefresh}
//           page={this.page}
//           ITEM_PAGE={this.ITEM_PAGE}
//         />
//       </ContainerComponent>
//     );
//   }
// }

// //Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
