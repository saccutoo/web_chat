import { EventBusName, EventBusType } from "../common/event-bus";
/* 
    Created by longdq
*/

// import { processRequestRespository } from 'core/common/networking/api-helper';
// import { pushStreamService } from 'core/common/push-stream-service';
// import { User } from 'types/user';
// import ListUserChatContainer from '../../features/list-user-chat/view/list-user-chat.screen';
// import { ListChatModel } from './list-user-chat.props';
// import ListUserChatServices from './list-user-chat.services';
import EventBus from "../common/event-bus";
import { Subscription } from "rxjs";

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

import { processRequestRespository } from "../common/networking/api-helper";
import { pushStreamService } from "../common/push-stream-service";
import { useEffect, useState } from "react";
import { User } from "../common/types/user";
import { ListChatModel, RoomChatProps } from "./room-chat.props";
import ListUserChatServices from "./room-chat.services";
import { IHyperMessage } from "../common/types/message";
import { INewUserChat } from "../common/types/message";
import { GetRoomChatRes } from "../common/types/base-response";
// import AsyncStorageHelpers, { StorageKey } from 'helpers/async-storage-helpers';
// import NavigationService from 'routers/navigation-service';
// import { IncomingCallScreen } from 'routers/screen-name';

export const RoomChatAdapter = (props: RoomChatProps) => {
  const { userInfo } = props;
  //Variables
  const subscriptions = new Subscription();
  const focusListener: any = null;
  var page: number = 1;
  const ITEM_PAGE = 15;

  // States
  const [dataListUser, setDataListUser] = useState<User[]>();
  // const [dataListChat, setDataListChat] = useState<ListChatModel[]>([]);
  const [dataListChat, setDataListChat] = useState<GetRoomChatRes[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  //Callback
  useEffect(() => {
    registerSubscriber();
    pushStreamService.subChat(userInfo?.user?.id);
    processRequestRespository(
      ListUserChatServices.getInstance().getListUser(),
      getListUserSuccess
    );
    getListChat();
    // getInfoVideoCall();
  }, []);

  useEffect(() => {
    return () => {
      subscriptions.unsubscribe();
    };
  }, []);

  //Logic
  function getListUserSuccess(res: User[]) {
    console.log("test_getListUserSuccess:", res);
    setDataListUser(res);
  }

  // Get list chat
  const getListChat = () => {
    // showLoading();
    // setIsLoading(true);
    processRequestRespository(
      ListUserChatServices.getInstance().getRoomChat({
        userId: userInfo?.user?.id,
        pageParams: { pageSize: ITEM_PAGE, page: page },
      }),
      getListChatSuccess
    );
  };

  const getListChatSuccess = (res: []) => {
    // setIsLoading(false);
    // hideLoading();
    console.log("test_list_user_page: ", page);
    // const newData: ListChatModel[] = page === 1 ? [...res] : [...dataListChat, ...res];
    const newData: GetRoomChatRes[] =
      page === 1 ? [...res] : [...dataListChat, ...res];

    setDataListChat(newData);
  };

  const registerSubscriber = () => {
    subscriptions.add(
      EventBus.getInstance().events.subscribe((res: EventBusType) => {
        if (res.payload) {
          console.log("test_messageReceived_event_bus: ", res.payload);
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
            case EventBusName.INCOMING_MESSAGE:
              const msg: IHyperMessage = res.payload;
              let new_data: any[] = [...dataListChat];
              new_data.push(msg);
              // const index_item = new_data.map((item) => item?.id).indexOf(msg?.chatId);
              // if (index_item != -1 && new_data[index_item] && new_data[index_item].messengers[0]) {
              //   const new_item = { ...new_data[index_item] };
              //   new_item.messengers[0].message = msg?.text;
              //   new_data.splice(index_item, 1);
              //   new_data.splice(0, 0, new_item);
              // }

              //Check new user
              // const exist_user = new_data.map((item) => item?.contact?.id).indexOf(msg?.user?._id);
              // if (exist_user === -1) {
              //   this.ListUserChatAdapter.getListChat();
              //   return;
              // }
              //Sort
              setDataListChat(new_data);
              break;
            case EventBusName.NEW_USER_CHAT:
              const newUserChat: INewUserChat = res.payload;
              //Check new user
              const exist_user1 = dataListChat
                .map((item: any) => item?.contact?.id)
                .indexOf(newUserChat?.userId);
              if (exist_user1 === -1) {
                getListChat();
              }
              break;
            case EventBusName.UPDATE_STATUS_USER:
              const user: User = res.payload;
              // let new_data_status: ListChatModel[] = [...dataListChat];
              let new_data_status: GetRoomChatRes[] = [...dataListChat];

              const index_item_status = new_data_status
                .map((item: any) => item?.contact?.id)
                .indexOf(user.id);
              if (
                index_item_status != -1 &&
                new_data_status[index_item_status]
              ) {
                const new_item: any = { ...new_data_status[index_item_status] };
                new_item.statusUser = user.statusUser;
                new_data_status.splice(index_item_status, 1, new_item);
              }
              setDataListChat(new_data_status);
              break;
            case EventBusName.RELOAD_LIST_CHAT:
              getListChat();
              return;
          }
        }
      })
    );
  };

  const onRefresh = () => {
    page = 1;
    setDataListChat([]);
    getListChat();
  };

  const onEndReached = () => {
    console.log("test_onEndReached");
    // if (isLoading || dataListChat.length < page * ITEM_PAGE) return;
    page += 1;
    getListChat();
    //Call url with new page
  };

  return {
    // isLoading,
    page,
    ITEM_PAGE,
    // setIsLoading,
    dataListUser,
    dataListChat,
    onRefresh,
    onEndReached,
    registerSubscriber,
    getListChat,
    getListUserSuccess,
  };
};
