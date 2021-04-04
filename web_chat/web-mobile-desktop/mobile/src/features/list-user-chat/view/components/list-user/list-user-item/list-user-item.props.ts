/* 
    Created by longdq
*/

import { User2 } from 'core/common/types/user';
// import { User } from 'features/login-old/view/components/login-form-wv/login-form-wv.props';

export interface ListUserItemProps {
  item: User2;
  goToChatDetail: (item: User2) => void;
}
