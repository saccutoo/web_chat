/* 
    Created by longdq
*/

import { GetRoomChatRes } from 'core/common/types/base-response';
import { ListChatModel } from 'core/model-list-user-chat/list-user-chat.props';

export interface ListChatProps {
  // dataListChat: ListChatModel[];
  dataListChat: GetRoomChatRes[];
  // goToChatDetail: (item: ListChatModel) => void;
  goToChatDetail: (item: GetRoomChatRes) => void;
  onRefresh: () => void;
  onEndReached: () => void;
  loading: boolean;
  isFinish: boolean;
}

// export interface ListChatStates {
//   loading:boolean
// }
