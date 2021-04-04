/* 
    Created by longdq
*/

import { User, User2 } from 'core/common/types/user';
import { itemDataCheck } from './item-list-user/item-list-user.component';

export interface SearchListUserProps {
  dataSearchUser: User2[];
  addToDataCheck: (item: itemDataCheck) => void;
  loading: boolean;
  onEndReached: () => void;
  onRefresh: () => void;
  page: number;
  ITEM_PAGE: number;
  value: string
}
