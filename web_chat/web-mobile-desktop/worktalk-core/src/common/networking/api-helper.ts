/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { APP_CONFIGS } from '../app-config';
// import { showAlert, TYPE } from 'libraries/dropdown-alert';
// import { hideLoading, showLoading } from 'libraries/loading/loading-modal';
// import { Alert } from 'react-native';
// import env from 'react-native-config';
// import { translate } from 'res/languages';
// import AsyncStorageHelpers, { StorageKey } from '../../../helpers/async-storage-helpers';
// import { LoginMobileResponse } from '../../../features/login-old/view/components/login-form-wv/login-form-wv.props';
import { SUCCESS } from './status';

const instance = axios.create({
  baseURL: APP_CONFIGS.URL_API,
  // baseURL: url,
  timeout: 20 * 1000,
});

instance.interceptors.request.use((_config) => requestHandler(_config));

const requestHandler = (request: AxiosRequestConfig) => {
  // if (__DEV__) {
  console.log(
    `Request API - ${request.method?.toUpperCase()}: ${request.baseURL}${request.url}`,
    request.params,
    request.data
  );
  // }

  return request;
};

instance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

const errorHandler = (error: any) => {
  // if (__DEV__) {
  console.log(error);
  // }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ ...error });
};

const successHandler = (response: AxiosResponse) => {
  // if (__DEV__) {
  console.log(`Response API: ${response.config.url}`, response.data);
  // }
  return response.data;
};

async function fetch(url: string, params?: any, isAuth?: boolean, isRaw?: boolean) {
  let headers = null;
  if (isAuth) {
    headers = await createHeader();
  }

  return !isRaw
    ? instance
        .get(url, { params, headers })
        .then((res) => checkToken(res))
        .catch((error) => error)
    : axios
        .create({
          // baseURL: `${env.REACT_APP_IP_ADDRESS_API}:${env.REACT_APP_IP_ADDRESS_PORT}`,
          timeout: 20 * 1000,
        })
        .get(url, { params, headers })
        .then((res) => {
          console.log('test_fetch_raw_success: ', res);
          return res;
        })
        .catch((error) => {
          console.log('test_fetch_raw_fail: ', error);
        });
}

async function post(url: string, data?: any, isAuth?: boolean, isRaw?: boolean) {
  let headers: any = null;
  if (isAuth) {
    headers = await createHeader();
  }
  return !isRaw
    ? instance
        .post(url, { ...data }, { headers })
        .then((res) => checkToken(res))
        .catch((error) => error)
    : axios
        .create({
          // baseURL: `${env.REACT_APP_IP_ADDRESS_API}:${env.REACT_APP_IP_ADDRESS_PORT}`,
          timeout: 20 * 1000,
        })
        .post(url, { data, headers })
        .then((res) => {
          console.log('test_post_raw_success: ', res);
          return res;
        })
        .catch((error) => {
          console.log('test_post_raw_fail: ', url, '__', data, '__', headers);
          console.log('test_post_raw_fail_1: ', error);
        });
}

async function postFile(url: string, data?: any, isAuth?: boolean) {
  let headers: any;
  headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  return instance
    .post(url, data, { headers })
    .then((res) => checkToken(res))
    .catch((error) => error);
}
//TEST
async function postTokenTest(url: string, body: any, isAuth?: boolean) {
  let headers = null;
  const data = {};

  if (isAuth) {
    headers = { Authorization: `Bearer ${body ? body.token : ''}` };
  }
  return instance
    .post(url, { ...data }, { headers })
    .then((res) => checkToken(res))
    .catch((error) => error);
}

async function postTokenFormDataTest(url: string, body: any, isAuth?: boolean) {
  let headers = null;
  const data: any = new FormData();
  const frm: any = body.frm;
  Object.keys(frm).forEach((key) => {
    if (frm[key] instanceof Array) {
      frm[key].forEach((value: string) => {
        data.append(`${key}[]`, value);
      });
    } else {
      data.append(key, frm[key]);
    }
  });

  if (isAuth) {
    headers = { Authorization: `Bearer ${body ? body.token : ''}` };
  }

  return instance
    .post(url, { ...data }, { headers })
    .then((res) => checkToken(res))
    .catch((error) => error);
}

//TEST

async function deletes(url: string, data?: any, isAuth?: boolean) {
  let headers = null;
  if (isAuth) {
    headers = await createHeader();
  }

  return instance
    .delete(url, { data: { ...data }, headers: { ...headers } })
    .then((res) => checkToken(res))
    .catch((error) => error);
}
async function put(url: string, data?: any, isAuth?: boolean) {
  let headers = null;
  if (isAuth) {
    headers = await createHeader();
  }

  return instance
    .put(url, { ...data }, { headers })
    .then((res) => checkToken(res))
    .catch((error) => error);
}

async function postFormData(url: string, body: any, isAuth: boolean = false) {
  const data: any = new FormData();
  Object.keys(body).forEach((key) => {
    if (body[key] instanceof Array) {
      body[key].forEach((value: string) => {
        data.append(`${key}[]`, value);
      });
    } else {
      data.append(key, body[key]);
    }
  });
  let headers = null;
  if (isAuth) {
    headers = await createHeader();
  }
  return instance
    .post(url, data, { headers })
    .then((res) => checkToken(res))
    .catch((error) => error);
}
async function postForm(url: string, data: any, isAuth?: boolean) {
  let headers = null;
  if (isAuth) {
    headers = await createHeader();
  }

  return instance
    .post(url, data, { headers })
    .then((res) => checkToken(res))
    .catch((error) => error);
}

// TODO
// Get Token
async function createHeader(): Promise<object> {
  // const setting: any = await getUserInfo();
  // return {
  //   Authorization: `Bearer ${setting ? setting.token : ''}`,
  // };
  return {};
}

export async function removeUser(): Promise<void> {
  // await AsyncStorageHelpers.remove(StorageKey.USER_INFO);
  // return Promise.resolve();
}

// TODO
export function checkToken(res: any) {
  // if (res && res.code === TOKEN_EXPIRED) {
  //   return new Promise<Object>((resolve, reject) => {
  //     Alert.alert(
  //       translate('notify'),
  //       translate('tokenInvalid'),
  //       [{ text: translate('common.yes'), onPress: () => {} }],
  //       { cancelable: false }
  //     );
  //   });
  // } else return res;
  return res;
}

//Process request
function processRequestRespository(
  reqPromise: Promise<any>,
  onSuccess?: (data?: any) => void,
  onfail?: (ex?: any, msg?: string) => void,
  isShowAlert: boolean = true,
  isShowLoading: boolean = true
) {
  // isShowLoading && showLoading();
  reqPromise
    .then((data) => {
      // hideLoading();
      switch (data?.status) {
        case SUCCESS:
          // isShowAlert && showAlert(TYPE.SUCCESS, translate('warning.success'), data.message);
          onSuccess && onSuccess(data.data);
          break;
        default:
          onfail && onfail(data);
          break;
      }
      //TODO: update sso
      onSuccess && onSuccess(data.data);
    })
    .catch((e) => {
      // hideLoading();
      console.log('tes_err_data_ex: ', e);

      // isShowAlert && showAlert(TYPE.WARN, translate('warning.warning'), e.message);
      onfail && onfail(e);
    });
}

function processRequestTrustRespository(
  reqPromise: Promise<any>,
  onSuccess?: (data?: any) => void,
  onfail?: (ex?: any, msg?: string) => void,
  isShowAlert: boolean = true,
  isShowLoading: boolean = true
) {
  // isShowLoading && showLoading();
  reqPromise
    .then((data) => {
      // hideLoading();
      switch (data?.status) {
        case SUCCESS:
          // isShowAlert && showAlert(TYPE.SUCCESS, translate('warning.success'), data.message);
          onSuccess && onSuccess(data);
          break;
        default:
          onfail && onfail(data);
          break;
      }
      //TODO: update sso
      onSuccess && onSuccess(data);
    })
    .catch((e) => {
      // hideLoading();
      console.log('tes_err_data_ex: ', e);

      // isShowAlert && showAlert(TYPE.WARN, translate('warning.warning'), e.message);
      onfail && onfail(e);
    });
}

export {
  fetch,
  post,
  postFile,
  put,
  postFormData,
  deletes,
  postForm,
  postTokenTest,
  postTokenFormDataTest,
  processRequestRespository,
  processRequestTrustRespository,
};
