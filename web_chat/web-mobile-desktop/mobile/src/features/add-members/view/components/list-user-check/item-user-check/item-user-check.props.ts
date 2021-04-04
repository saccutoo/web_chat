/* 
    Created by longdq
*/

import { itemDataCheck } from '../../search-list-user/item-list-user/item-list-user.component';

export interface ItemUserCheckProps {
  itemUserCheck: itemDataCheck;
  removeUserCheck: (item: itemDataCheck) => void;
}
