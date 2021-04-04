/* 
    Created by longdq
*/

import { User, User2 } from 'core/common/types/user';

export interface SearchListUserProps {
  dataSearchUser: User2[];
  goToChatDetail: (item: User2) => void;
  loading: boolean;
  onEndReached: () => void;
  onRefresh: () => void;
  page: number;
  ITEM_PAGE: number;
}
