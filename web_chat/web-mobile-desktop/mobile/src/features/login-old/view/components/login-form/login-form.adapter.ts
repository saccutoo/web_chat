/* 
    Created by thaolt
*/
import { LoginFormComponent } from './login-form.component';
import { showLoading } from '../../../../../libraries/loading/loading-modal';
import { processRequestRespository } from 'core/common/networking/api-helper';
import LoginOldServices from 'features/login-old/model-login-old/login-old.services';
import { HyperUtils } from '../../../../../core/common/hyper-utils';
import { async } from 'rxjs';
import asyncStorageHelpers, { StorageKey } from 'helpers/async-storage-helpers';

export class LoginFormAdapter {
  private LoginFormComponent: LoginFormComponent;

  constructor(Component: LoginFormComponent) {
    this.LoginFormComponent = Component;
  }

  getDomain = async () => {
    try {
      const value = await asyncStorageHelpers.get(StorageKey.DOMAIN_COMPANY);
      if (value !== null) {
        this.LoginFormComponent.setState({
          infoDomain: value,
        });
      }
    } catch (error) {}
  };

  getFormValue = () => {
    console.log('test_getFormValue');
    console.log('test_getFormValue_1: ', this.LoginFormComponent);
    console.log('test_getFormValue_2: ', this.LoginFormComponent.props);
    const { loginSSO } = this.LoginFormComponent.props;
    console.log('test_getFormValue_1');
    const username = this.LoginFormComponent.refTxtUsername.current?.state.value || '';
    console.log('test_getFormValue_2');
    const pass = this.LoginFormComponent.refTxtPass.current?.state.value || '';
    console.log('test_getFormValue_3');
    if (HyperUtils.isEmpty(username)) {
      this.LoginFormComponent.refTxtUsername.current?.onShowError(true);
      return;
    }

    if (!HyperUtils.isEmpty(username))
      this.LoginFormComponent.refTxtUsername.current?.onShowError(false);

    if (HyperUtils.isEmpty(pass)) {
      this.LoginFormComponent.refTxtPass.current?.onShowError(true);
      return;
    }

    if (!HyperUtils.isEmpty(pass)) this.LoginFormComponent.refTxtPass.current?.onShowError(false);

    // showLoading();
    loginSSO(username, pass);

    // const data = {
    //   username: '',
    //   password: '',
    // };
    // // const data = {
    // //   service: 'https%3A%2F%2Fhyperlogy.ihcm.vn%2Fihcm%2F',
    // // };
    // processRequestRespository(
    //   LoginOldServices.getInstance().getTicketCas(data),
    //   (res: any) => {
    //     console.log('test_success:', res);
    //   },
    //   (res: any) => {
    //     console.log('test_fail:', res);
    //   }
    // );
  };
}
