/* 
    Created by longdq
*/

import { User, User2 } from 'core/common/types/user';

export interface ItemListUserProps {
  item: User2;
  goToChatDetail: (item: User2) => void;
}
