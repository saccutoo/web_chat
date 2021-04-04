import { EventBusName, EventBusType } from 'core/common/event-bus';
/* 
    Created by longdq
*/
import EventBus from 'core/common/event-bus';
import { Subscription } from 'rxjs';

// export class ListUserChatAdapter {
//   ListUserChatContainer: ListUserChatContainer;
//   constructor(container: ListUserChatContainer) {
//     this.ListUserChatContainer = container;
//     //Init Socket
//     pushStreamService.subChat(this.ListUserChatContainer.props.userInfo?.user?.id);
//   }

//   getListUser = () => {
//     processRequestRespository(
//       ListUserChatServices.getInstance().getListUser(),
//       this.getListUserSuccess
//     );
//   };

//   getListUserSuccess = (res: User[]) => {
//     // console.log(res, 'data tra ve');
//     this.ListUserChatContainer.setState({
//       dataListUser: res,
//     });
//   };

//   getListChat = () => {
//     const { userInfo } = this.ListUserChatContainer.props;
//     let { page, ITEM_PAGE } = this.ListUserChatContainer;
//     // showLoading();
//     this.ListUserChatContainer.setState({
//       loading: true,
//     });
//     processRequestRespository(
//       ListUserChatServices.getInstance().getRoomChat(userInfo.user.id, ITEM_PAGE, page),
//       this.getListChatSuccess
//     );
//   };

//   getListChatSuccess = (res: ListChatModel[]) => {
//     this.ListUserChatContainer.setState({
//       loading: false,
//     });
//     // hideLoading();
//     console.log('test_list_user_page: ', this.ListUserChatContainer.page);
//     const newData =
//       this.ListUserChatContainer.page === 1
//         ? [...res]
//         : [...this.ListUserChatContainer.state.dataListChat, ...res];
//     this.ListUserChatContainer.setState(
//       {
//         dataListChat: newData,
//       },
//       () => {
//         console.log('test_list_user: ', this.ListUserChatContainer.state.dataListUser);
//       }
//     );
//   };

//   onRefresh = () => {
//     this.ListUserChatContainer.page = 1;
//     this.ListUserChatContainer.setState({
//       dataListChat: [],
//     });
//     this.getListChat();
//   };

//   onEndReached = () => {
//     console.log('test_onEndReached');
//     const { dataListChat } = this.ListUserChatContainer.state;
//     const { loading } = this.ListUserChatContainer.state;
//     let { page, ITEM_PAGE } = this.ListUserChatContainer;
//     if (loading || dataListChat.length < page * ITEM_PAGE) return;
//     this.ListUserChatContainer.page += 1;
//     this.getListChat();
//     //Call url with new page
//   };
// }

import { processRequestRespository } from 'core/common/networking/api-helper';
import { pushStreamService } from 'core/common/push-stream-service';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { User } from 'core/common/types/user';
import { ListChatModel, ListUserChatProps } from './list-user-chat.props';
import ListUserChatServices from './list-user-chat.services';
import { IMessage } from 'react-native-gifted-chat';
import { INewUserChat } from 'core/common/types/message';
import { GetRoomChatRes } from 'core/common/types/base-response';
import { APP_CONFIGS } from 'core/common/app-config';
// import AsyncStorageHelpers, { StorageKey } from 'helpers/async-storage-helpers';
// import NavigationService from 'routers/navigation-service';
// import { IncomingCallScreen } from 'routers/screen-name';
import { PushStreamTypes } from '../common/types/push-stream-types';

//Variables
const subscriptions = new Subscription();
const focusListener: any = null;
var isFinish: boolean = false;
var counter: number = 1;

export const ListUserChatAdapter = (props: ListUserChatProps) => {
  const { userInfo } = props;
  // States
  // const [dataListUser, setDataListUser] = useState<User[]>();
  // const [dataListChat, setDataListChat] = useState<ListChatModel[]>([]);
  const [dataListChat, setDataListChat] = useState<GetRoomChatRes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  //Callback
  useEffect(() => {
    registerSubscriber();
    pushStreamService.subChat(userInfo?.user?.id);
    // processRequestRespository(ListUserChatServices.getInstance().getListUser(), getListUserSuccess);
    // getListChat();
    // getInfoVideoCall();

    // setPage(1);
    // getListChat()
  }, []);

  useEffect(() => {
    return () => {
      subscriptions.unsubscribe();
    };
  }, []);

  //Get data
  useEffect(() => {
    console.log('test_list_user_page_onEndReached_page_changed: ', page);
    getListChat();
  }, [page]);

  //Logic
  // const getListUserSuccess = (res: User[]) => {
  //   console.log('test_getListUserSuccess:', res);
  //   // setDataListUser(res);
  // };

  // Get list chat
  const getListChat = () => {
    // showLoading();
    // setIsLoading(true);
    console.log('test_list_user_page_get_data: ');
    processRequestRespository(
      ListUserChatServices.getInstance().getRoomChat({
        userId: userInfo?.user?.id,
        pageParams: { pageSize: APP_CONFIGS.ITEM_PER_PAGE, page: page },
      }),
      (res, totalPages) => {
        // setIsLoading(false);
        // hideLoading();
        console.log(
          'test_list_user_page_33: ',
          page,
          ', isFinish: ',
          isFinish,
          ', res:',
          totalPages
        );
        // isLoading && setIsLoading(false);
        // const newData: ListChatModel[] = page === 1 ? [...res] : [...dataListChat, ...res];
        const newData: GetRoomChatRes[] = page === 1 ? [...res] : [...dataListChat, ...res];
        isFinish = page >= totalPages;
        console.log('test_list_user_page_88: ', isFinish, ', newData: ', newData);
        setDataListChat(newData);
      }
    );
  };

  // const getListChatSuccess = (res: []) => {
  //   // setIsLoading(false);
  //   // hideLoading();
  //   console.log('test_list_user_page_33: ', page, ', isLoading: ', isLoading);
  //   // isLoading && setIsLoading(false);
  //   // const newData: ListChatModel[] = page === 1 ? [...res] : [...dataListChat, ...res];
  //   const newData: GetRoomChatRes[] = page === 1 ? [...res] : [...dataListChat, ...res];

  //   setDataListChat(newData);
  // };

  // const getListChatSuccess = useCallback((res: [], totalPages: number) => {}, []);

  const registerSubscriber = () => {
    subscriptions.add(
      EventBus.getInstance().events.subscribe((res: EventBusType) => {
        if (res.payload) {
          console.log('test_messageReceived_event_bus: ', res.payload);
          switch (res.type) {
            // TODO
            // case EventBusName.INCOMING_MESSAGE:
            //   const msg: IMessage = res.payload;
            //   let new_data = [...this.state.dataListChat];
            //   const index_item = new_data.map((item) => item?.id).indexOf(msg?.chatId);
            //   if (index_item != -1 && new_data[index_item] && new_data[index_item].messengers[0]) {
            //     const new_item = { ...new_data[index_item] };
            //     new_item.messengers[0].message = msg?.text;
            //     new_data.splice(index_item, 1);
            //     new_data.splice(0, 0, new_item);
            //   }
            //   //Check new user
            //   const exist_user = new_data.map((item) => item?.contact?.id).indexOf(msg?.user?._id);
            //   if (exist_user === -1) {
            //     this.ListUserChatAdapter.getListChat();
            //     return;
            //   }
            //   //Sort
            //   this.setState({
            //     dataListChat: new_data,
            //   });
            //   break;
            case EventBusName.NEW_MESSENGER:
              const msg: IMessage = res?.payload;
              //Check new user
              // const exist_user = new_data.map((item) => item?.contact?.id).indexOf(msg?.user?._id);
              // if (exist_user === -1) {
              //   this.ListUserChatAdapter.getListChat();
              //   return;
              // }
              //Sort
              setDataListChat((prev) => {
                let new_data: any[] = [...prev];
                // new_data.push(msg);
                const index_item = new_data.map((item) => item?.id).indexOf(msg?.chatId);
                if (
                  index_item != -1 &&
                  new_data[index_item]
                  // && new_data[index_item].messengers[0]
                ) {
                  const new_item = { ...new_data[index_item] };
                  console.log('test_incoming_msg_text_room_new_item:', new_item);
                  if (new_item.chats?.length > 0) {
                    new_item.chats[0].message = msg?.text;
                    new_item.chats[0].createdAt = msg?.createdAt;
                    new_data.splice(index_item, 1);
                    new_data.splice(0, 0, new_item);
                  }
                }
                return [...prev, ...new_data];
              });
              break;
            case EventBusName.CREATE_CHAT_ROOM:
              const chatRoom: GetRoomChatRes = res?.payload;
              console.log('test_incoming_msg_chat_room: ', chatRoom);
              setDataListChat((prev)=> {
                const new_data = [chatRoom, ...prev]
                console.log('test_incoming_msg_chat_room_prev:', prev)
                console.log('test_incoming_msg_chat_room_new_data:', new_data)
                return new_data
              })
              break;
            //TODO
            // case EventBusName.NEW_USER_CHAT:
            //   const newUserChat: INewUserChat = res.payload;
            //   //Check new user
            //   const exist_user1 = dataListChat
            //     .map((item) => item?.contact?.id)
            //     .indexOf(newUserChat?.userId);
            //   if (exist_user1 === -1) {
            //     getListChat();
            //   }
            //   break;
            // case EventBusName.UPDATE_STATUS_USER:
            //   const user: User = res.payload;
            //   // let new_data_status: ListChatModel[] = [...dataListChat];
            //   let new_data_status: GetRoomChatRes[] = [...dataListChat];

            //   const index_item_status = new_data_status
            //     .map((item) => item?.contact?.id)
            //     .indexOf(user.id);
            //   if (index_item_status != -1 && new_data_status[index_item_status]) {
            //     const new_item = { ...new_data_status[index_item_status] };
            //     new_item.statusUser = user.statusUser;
            //     new_data_status.splice(index_item_status, 1, new_item);
            //   }
            //   setDataListChat(new_data_status);
            //   break;
            // case EventBusName.RELOAD_LIST_CHAT:
            //   getListChat();
            //   return;
          }
        }
      })
    );
  };

  const onRefresh = () => {
    // setIsLoading(true);
    console.log('test_list_user_page_onRefresh');
    setPage(1);
    // page = 1;
    // setDataListChat([]);
    // getListChat();
  };

  const onEndReached = () => {
    console.log('test_list_user_page_onEndReached_isFinish: ', isFinish);
    // if (isLoading || dataListChat.length < page * ITEM_PAGE) return;
    // page += 1;
    // getListChat();

    if (isFinish) return;
    setPage(page + 1);
    console.log('test_list_user_page_onEndReached_update_page');
  };

  return {
    isLoading,
    page,
    dataListChat,
    isFinish,
    onRefresh,
    onEndReached,
    registerSubscriber,
    getListChat,
    // getListUserSuccess,
  };
};

export default ListUserChatAdapter;
