import { LoginMobileResponse } from '../../types/login';
interface UserState {
    userInfo: LoginMobileResponse;
}
export declare const userReducers: (state: any, action: any) => UserState;
export {};
