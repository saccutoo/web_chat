/* 
    Created by longdq
*/

import { User, User2 } from 'core/common/types/user';

export interface ProfileInfoProps {
  userInfo: User2;
  logout: () => void;
  goBack: () => void;
}
