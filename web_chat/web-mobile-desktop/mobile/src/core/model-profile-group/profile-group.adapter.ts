import { useState } from 'react';
/* 
    Created by longdq
*/

import { processRequestRespository } from 'core/common/networking/api-helper';
import { User, User2 } from 'core/common/types/user';
import ProfileGroupServices from './profile-group.services';
import { ModelInfoGr } from './profile-group.states';
import { ProfileGroupProps } from './profile-group.props';
import { ChatInfoParams } from 'core/model-chat-detail/chat-detail.props';
import navigationService from 'routers/navigation-service';
import { ViewPhotoScreen } from 'routers/screen-name';
import { GetUserConversationRes } from 'core/common/types/base-response';

function ProfileGroupAdapter(props: ProfileGroupProps) {
  const [chatInfo, setChatInfo] = useState<ChatInfoParams>();
  const [dataInfoGr, setDataInfoGr] = useState<ModelInfoGr>({
    users: [],
    avatar_url: '',
  });
  const [index, setIndex] = useState<number>(0);
  const [routes, setRoutes] = useState<Object>([
    { key: '1', title: 'First' },
    { key: '2', title: 'Second' },
  ]);
  const [userConversation, setUserConversation] = useState<User2[]>([]);

  const goToChatDetail = () => {};

  const getInfo = () => {
    const chatId = chatInfo && chatInfo?.id;
    processRequestRespository(
      ProfileGroupServices.getInstance().getInfoChat(chatId),
      getInfoSuccess
    );
  };

  const getInfoSuccess = (res: ModelInfoGr) => {
    if (res) {
      setDataInfoGr(res);
    }
  };

  // const removeUserGr = (item: GetUserConversationRes) => {
  //   const chatId = chatInfo && chatInfo?.data.id;
  //   const userId = item && item.id;
  //   console.log('REMOVE USER FROM CONVERSATION :', userId, '-------', chatInfo);

  //   if (chatId && userId) {
  //     processRequestRespository(
  //       ProfileGroupServices.getInstance().removeUserGr(userId, chatId),
  //       removeUserSuccess
  //     );
  //   }
  // };

  // const removeUserSuccess = (res: any) => {
  //   res && getInfo;
  // };

  const goToPhotoDetail = (item: any) => {
    navigationService.navigate(ViewPhotoScreen, { message: item });
  };

  return {
    chatInfo,
    index,
    dataInfoGr,
    routes,
    getInfo,
    goToChatDetail,
    // removeUserGr,
    setIndex,
    goToPhotoDetail,
    // getUserConversation
  };
}

export default ProfileGroupAdapter;
