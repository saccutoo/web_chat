/* 
    Created by longdq
*/

import { User } from 'core/common/types/user';

export interface SearchStates {
  dataSearchUser: User[];
  loading: boolean;
  txt: string;
}
