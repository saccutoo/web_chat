/* 
    Created by longdq
*/

import { itemDataCheck } from '../search-list-user/item-list-user/item-list-user.component';

export interface ListUserCheckProps {
  dataUserCheck: itemDataCheck[];
  removeUserCheck: (item: itemDataCheck) => void;
  onCreateGr: () => void;
}
