/* 
    Created by longdq
*/

import { LoginMobileResponse } from '../common/types/login';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

export interface ProfileProps {
  userInfo: LoginMobileResponse;
  removeUserInfoAction: () => void;
  navigation : NavigationScreenProp<NavigationState, NavigationParams>
}
