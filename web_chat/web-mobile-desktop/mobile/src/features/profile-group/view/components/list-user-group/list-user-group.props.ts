/* 
    Created by longdq
*/

import { ModelInfoGr } from 'features/profile-group/model-profile-group/profile-group.states';
import { User2 } from 'core/common/types/user';
import { LoginMobileResponse } from 'core/common/types/login';
import { GetUserConversationRes } from 'core/common/types/base-response';

export interface ListUserGroupProps {
  dataInfoGr: ModelInfoGr;
  roomId: string;
  goToChatDetail: (item: User2) => void;
  removeUserGr: (item: GetUserConversationRes) => void;
  openModal: (item: GetUserConversationRes) => void
  userInfo: LoginMobileResponse;
}
