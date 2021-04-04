import { LoginMobileResponse, LoginMobileRequest } from '../../types/login';
export declare const loginMobileAction: (data: LoginMobileRequest) => {
    type: string;
    data: LoginMobileRequest;
};
export declare const saveUserInfoAction: (data: LoginMobileResponse) => {
    type: string;
    data: LoginMobileResponse;
};
export declare const removeUserInfoAction: () => {
    type: string;
};
