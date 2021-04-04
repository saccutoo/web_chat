/* 
    Created by longdq
*/

import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { User } from '../common/types/user';

export interface IncomingCallProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  userInfo: User;
}
