/* 
    Created by longdq
*/

import { GetUserConversationRes } from 'core/common/types/base-response';
import { User, User2 } from 'core/common/types/user';

export interface ItemUserGroupProps {
  item: GetUserConversationRes;
  goToChatDetail: (item: GetUserConversationRes) => void;
  removeUserGr: (item: GetUserConversationRes) => void;
  openModal: (item: GetUserConversationRes) => void;
}
