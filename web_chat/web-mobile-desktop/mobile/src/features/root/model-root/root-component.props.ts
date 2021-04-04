/* 
    Created by thaolt at 06-12-2020 17:50:07
*/

import { ReactNode } from 'react';
import { LoginMobileResponse } from 'features/login-old/view/components/login-form-wv/login-form-wv.props';

export interface RootComponentProps {
  saveUserInfoAction: (data: LoginMobileResponse) => void;
  children: ReactNode;
  userInfo: LoginMobileResponse;
}

export interface UpdateDeviceInfoRequest {
  brand: string;
  deviceId: string;
  deviceName: string;
  manufacturer: string;
  model: string;
  osName: string;
  osVersion: string;
  tokenFcm: string;
  sessionCode: string;
  status: number;
}

export interface UpdateDeviceInfoResponse {
  brand: string;
  createdAt: string;
  deviceId: string;
  deviceName: string;
  id: string;
  manufacturer: string;
  model: string;
  osName: string;
  osVersion: string;
  sessionCode: string;
  status: number;
  tokenFcm: string;
  updatedAt: string;
}
