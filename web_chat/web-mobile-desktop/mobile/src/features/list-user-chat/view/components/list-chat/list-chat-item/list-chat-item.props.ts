/* 
    Created by longdq
*/

import { GetRoomChatRes } from 'core/common/types/base-response';
import { ListChatModel } from 'core/model-list-user-chat/list-user-chat.props';

export interface ListChatItemProps {
  // item: ListChatModel;
  // goToChatDetail: (item: ListChatModel) => void;
  item: GetRoomChatRes;
  goToChatDetail: (item: GetRoomChatRes) => void;
}
