/* 
    Created by longdq
*/

import { LoginMobileResponse } from '../../features/login-old/view/components/login-form-wv/login-form-wv.props';

export interface ChatDetailProps {
  userInfo: LoginMobileResponse;
}

export enum TypeParam {
  //Sent from list user chat
  FORM_MESSAGE = 'FORM_MESSAGE',
  //From search user
  FROM_USER = 'FROM_USER',
}

export interface ChatInfoParams {
  data: any;
  type: TypeParam;
}

export interface RemoveMessageParams {
  msgId: string;
  senderId: string;
  chatId:string
}