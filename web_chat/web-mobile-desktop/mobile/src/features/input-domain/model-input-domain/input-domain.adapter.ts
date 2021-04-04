import RNFetchBlob from 'rn-fetch-blob';
/* 
    Created by longdq
*/

import { Dispatch } from 'redux';
import InputDomainContainer from '../view/input-domain.screen';
import navigationService from 'routers/navigation-service';
import { LoginOldScreen } from 'routers/screen-name';
import asyncStorageHelpers, { StorageKey } from 'helpers/async-storage-helpers';
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageHelpers from 'helpers/async-storage-helpers';
import { showMessage } from 'react-native-flash-message';
import { translate } from 'res/languages';
import { showLoading, hideLoading } from 'libraries/loading/loading-modal';
import { URL_PATHS } from '../../../core/common/networking/url-paths';

var HTMLParser = require('fast-html-parser');

export class InputDomainAdapter {
  InputDomainContainer: InputDomainContainer;
  constructor(container: InputDomainContainer) {
    this.InputDomainContainer = container;
  }

  checkDomain = async () => {
    const domain = this.InputDomainContainer.refTxtInputDomain.current?.state.value || '';

    if (!domain) {
      this.InputDomainContainer.refTxtInputDomain.current?.setState({
        errorInput: true,
      });
      this.InputDomainContainer.setState({
        errorTxt: translate('inputDomain.errorInput'),
      });
      return;
    }

    try {
      showLoading();
      const tmp_domain = URL_PATHS.BASE_URL_IHCM.replace('@domain', domain);
      console.log('test_check_domain_starting: ', tmp_domain);
      const response = await RNFetchBlob.config({
        trusty: true,
      }).fetch('GET', tmp_domain);
      // console.log('test_check_domain_result: ', response)
      if (response && response.respInfo && response.respInfo.status === 200) {
        hideLoading();
        const resText = await response.text();
        const html = HTMLParser.parse(resText);
        const rawText = html && html.structuredText && html.structuredText.toString();
        // console.log('test_check_domain_result_success_3: ', rawText)
        if (rawText) {
          const checkTxtDomain = rawText.includes(domain);
          console.log('test_check_domain: ', checkTxtDomain);
          if (!checkTxtDomain) {
            try {
              const saveDomain = await asyncStorageHelpers.save(StorageKey.DOMAIN_COMPANY, domain);
            } catch (error) {
              console.log('test_check_doimain: ', error);
            }
            this.goToLogin();
          } else {
            this.InputDomainContainer.refTxtInputDomain.current?.setState({
              errorInput: true,
            });
            this.InputDomainContainer.setState({
              errorTxt: translate('inputDomain.error'),
            });
          }
        }
      } else {
        hideLoading();
        showMessage({
          message: translate('error.mesSys'),
          description: translate('error.errDes'),
          type: 'danger',
          icon: 'danger',
          floating: true,
          autoHide: true,
          hideOnPress: true,
        });
      }
    } catch (error) {
      console.log('test_check_domain_error: ', error);
      hideLoading();
      showMessage({
        message: translate('error.mesSys'),
        description: translate('error.errDes'),
        type: 'danger',
        icon: 'danger',
        floating: true,
        autoHide: true,
        hideOnPress: true,
      });
    }
  };

  goToLogin = () => {
    navigationService.navigate(LoginOldScreen);
  };
}
