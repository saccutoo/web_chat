/* 
    Created by longdq
*/

import { User, User2 } from 'core/common/types/user';
import { itemDataCheck } from './item-list-user.component';

export interface ItemListUserProps {
  item: User2;
  addToDataCheck: (item: itemDataCheck) => void;
}
