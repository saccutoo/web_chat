import { LoginMobileResponse } from 'features/login-old/view/components/login-form-wv/login-form-wv.props';
import { NumberArray } from 'react-native-svg';
/* 
    Created by longdq
*/

import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { KindOfMsg } from '../../../core/common/types/message';

export interface VideoCallProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  userInfo: LoginMobileResponse;
}

export interface StatusVideoCallParams {
  chatId: string;
  type: KindOfMsg;
  link?: string;
  senderId: string;
  receiverId: string;
  timeStart?: string;
  timeEnd?: string;
}
