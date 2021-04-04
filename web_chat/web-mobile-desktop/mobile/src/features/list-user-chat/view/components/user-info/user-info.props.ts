/* 
    Created by longdq
*/

import { User } from 'core/common/types/user';
import { User2 } from '../../../../../core/common/types/user';

export interface UserInfoProps {
  userInfo: User2;
  goToProfile: () => void;
  goToNewMess: () => void;
  goToNotifi: () => void;
}
