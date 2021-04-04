/* 
    Created by thaolt
*/
import LoginOldServices from 'features/login-old/model-login-old/login-old.services';
import { showAlert, TYPE } from 'libraries/dropdown-alert';
import { processRequestRespository } from 'core/common/networking/api-helper';
import { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import { translate } from 'res/languages';
import { hideLoading } from '../../../../../libraries/loading/loading-modal';
import { LoginFormWvComponent } from './login-form-wv.component';
import { LoginMobileRequest } from './login-form-wv.props';

export class LoginFormWvComponentAdapter {
  private LoginFormWvComponent: LoginFormWvComponent;
  private userName: string = '';
  private pass: string = '';
  private isErrorWv: boolean = true;
  private TIME_OUT_ERROR: number = 10000;
  private isLogin: boolean = false;

  constructor(Component: LoginFormWvComponent) {
    this.LoginFormWvComponent = Component;
  }

  onMessage = (e: WebViewMessageEvent) => {
    console.log('test_onMessage: ', e);
  };

  onNavigationStateChange = (newNavState: WebViewNavigation) => {
    console.log('test_test_onNavigationStateChange_0', newNavState);
    // showAlert(TYPE.WARN, 'nav: '+ newNavState)
    if (newNavState && newNavState.url && newNavState.url.includes('ticket')) {
      this.isErrorWv = false;
      if (!this.isLogin) {
        // loginHandle(data.username, data.password);
        const url_part = newNavState?.url.split('?');
        const ticket = url_part?.[url_part?.length - 1]?.split('=')?.[1];
        // showAlert(TYPE.WARN, 'inside: '+ ticket)
        console.log('test_onNavigationStateChange_inside:', ticket);
        hideLoading();
        this.checkTicket(ticket);
        this.isLogin = true;
      }
    }
  };

  fillFormWv = (username: string, pass: string) => {
    console.log('test_fillFormWv: ', username, pass);
    let injectedData = `document.getElementById("username").value = '${username}';document.getElementById("password").value = '${pass}';document.querySelector("#fm1 input.btn-submit").click();`;
    this.LoginFormWvComponent.refWebEl.current?.injectJavaScript(injectedData);
    this.userName = username;
    this.pass = pass;

    this.checkIsErrorWv();
  };

  private checkIsErrorWv = () => {
    setTimeout(() => {
      if (this.isErrorWv) {
        hideLoading();
        showAlert(TYPE.WARN, translate('warning.errServer'));
        this.isErrorWv = false;
      }
    }, 20000);
  };

  private checkTicket = (ticket: string) => {
    processRequestRespository(
      LoginOldServices.getInstance().checkTicket(ticket),
      this.onCheckTicketSuccess
    );
  };

  private onCheckTicketSuccess = (result: any) => {
    //Login mobile
    const loginMobileReq: LoginMobileRequest = {
      email: this.userName,
      password: this.pass,
    };

    this.LoginFormWvComponent.props.loginMobile(loginMobileReq);
  };
}
