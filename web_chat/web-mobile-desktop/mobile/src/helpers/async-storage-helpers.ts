import AsyncStorage from '@react-native-community/async-storage';

export enum StorageKey {
  USER_INFO = 'USER_INFO',
  DEVICE_INFO = 'DEVICE_INFO',
  DOMAIN_COMPANY = 'DOMAIN_COMPANY',
  //
  VIDEO_CALL_INFO = 'VIDEO_CALL_INFO'
}

function save(key: StorageKey, value: any) {
  AsyncStorage.setItem(key, value);
}

async function get(key: StorageKey) {
  return AsyncStorage.getItem(key);
}

async function remove(key: StorageKey) {
  return AsyncStorage.removeItem(key);
}

// Sử dụng nếu AsyncStorage dữ liệu dạng Json object
function saveObject(key: string, value: any) {
  AsyncStorage.setItem(key, JSON.stringify(value));
}

// sử dụng nếu AsyncStorage dữ liệu dạng Json object
async function getObject(key: string) {
  let value: any = await AsyncStorage.getItem(key);
  return JSON.parse(value);
}

export default {
  save,
  get,
  remove,
  saveObject,
  getObject,
};
