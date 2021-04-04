var env: any = null;
try {
  console.log('test_app_config_starting...')  
  env = require("react-native-config");
} catch(ex) {
  console.log('test_app_config_ex: ', ex)
}

console.log('test_app_config...', env)
const IS_WEB = process?.env?.REACT_APP_IP_ADDRESS_API !== undefined;
console.log('test_app_config_rs:', IS_WEB)
console.log('test_app_config_env_mobile:', env?.Config?.REACT_APP_IP_ADDRESS_URL)

const PROTOCOL = "http://";
const HOST_API = IS_WEB
  ? process.env.REACT_APP_IP_ADDRESS_API
  : env.Config.REACT_APP_IP_ADDRESS_API;
const PORT_API = IS_WEB
  ? process.env.REACT_APP_IP_ADDRESS_PORT
  : env.Config.REACT_APP_IP_ADDRESS_PORT;

const REACT_APP_IP_ADDRESS_URL = IS_WEB
  ? process.env.REACT_APP_IP_ADDRESS_URL
  : env.Config.REACT_APP_IP_ADDRESS_URL;

const PUSH_STREAM_URL = IS_WEB
  ? process.env.REACT_APP_PUSH_STREAM_IP
  : env.Config.REACT_APP_PUSH_STREAM_IP;

const REACT_APP_PUSH_STREAM_PROTOCOL = IS_WEB
  ? process.env.REACT_APP_PUSH_STREAM_PROTOCOL
  : env.Config.REACT_APP_PUSH_STREAM_PROTOCOL;

const REACT_APP_PUSH_STREAM_URL = IS_WEB
  ? process.env.REACT_APP_PUSH_STREAM_URL
  : env.Config.REACT_APP_PUSH_STREAM_URL;

const PUSH_STREAM_PORT = IS_WEB
  ? process.env.REACT_APP_PUSH_STREAM_PORT
  : env.Config.REACT_APP_PUSH_STREAM_PORT;

// const HOST_FILE = "http://172.20.80.19:9002";
// const PATH_FILE = "/api/file/GetFileStreamById?guid=";

const APP_CONFIGS = {
  DEFAULT_NUMBER_PAGE: 1,
  ITEM_PER_PAGE: 20,
  CHAT_ITEM_PER_PAGE: 20,
  // URL_API: `${PROTOCOL}${HOST_API}:${PORT_API}`,
  // URL_PUSH_STREAM: `${HOST_API}:${PUSH_STREAM_PORT}`,
  URL_API: `${REACT_APP_IP_ADDRESS_URL}`,
  PUSH_STREAM_PROTOCOL: `${REACT_APP_PUSH_STREAM_PROTOCOL}`,
  // URL_PUSH_STREAM: `${REACT_APP_PUSH_STREAM_PROTOCOL}://${REACT_APP_PUSH_STREAM_URL}`,
  URL_PUSH_STREAM: `ws://${HOST_API}:${PUSH_STREAM_PORT}`,
};

export { APP_CONFIGS };
