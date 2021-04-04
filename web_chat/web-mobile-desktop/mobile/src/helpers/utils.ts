import I18n from 'i18n-js';
// import env from 'react-native-config';
import { showAlert, TYPE } from 'libraries/dropdown-alert';
import moment, { Moment } from 'moment';
import { Dimensions, Linking, PixelRatio, Platform, Alert } from 'react-native';
import { translate } from 'res/languages';
import { DimensionHelpers } from './dimension-helpers';
import { TIME_VALUE } from './time-hepplers';
import AsyncStorageHelpers, { StorageKey } from 'helpers/async-storage-helpers';
import NavigationService from 'routers/navigation-service';
import { AuthenNavigator } from 'routers/screen-name';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function getDomain() {
  return 'demo08'
}

function isBlank(str: any) {
  return !str || /^\s*$/.test(str);
}

// function getBaseImage(image: string) {
//   if (typeof image === 'object' || typeof image === 'number') {
//     return image;
//   }
//   if (image && image.indexOf('http') < 0) {
//     return `${env.baseURL}${image}`;
//   }
//   return image;
// }

// function getImage(image: string | { uri: string }) {
//   if (typeof image === 'object' || typeof image === 'number') {
//     return image;
//   }
//   if (image && image.indexOf('http') < 0) {
//     return { uri: `${env.baseURL}${image}` };
//   }
//   return { uri: image };
// }

function _formatPrice(num: number | string) {
  if (!num) return '';
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function capitalizeFirstLetter(str: string) {
  if (!str) return ' ';
  return str
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const DEFAULT_BREAK_START = '12:00';
const DEFAULT_END_BREAK = '13:00';

function validatePhone(str: string | number) {
  const re = /(^0{1})+[0-9]{8,9}$/;
  return re.test(str);
}

// function returnImg(image: string) {
//   if (image && image.indexOf('http') < 0) {
//     return { uri: `${env.baseURL}${image}` };
//   }
//   return { uri: image };
// }

function isYoutube(uri: string) {
  if (uri && uri.indexOf('youtube') > 0) {
    return true;
  }
  return false;
}

function isEmpty(str: string) {
  return !str || /^\s*$/.test(str);
}

function isValiEmpty(str: string): boolean {
  if (!str || str.trim().length === 0) return false;
  return true;
}

function change_alias(alias: string) {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' '
  );
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  return str;
}

const formatCurrency = (value: number | string) => {
  if (typeof value === 'string') {
    value = Number(value.trim().replace(/./g, ''));
  }
  return I18n.toNumber(value, { delimiter: '.', precision: 0 });
};

const formatFromCurrencyToString = (value: string) => {
  return parseInt(
    value
      .trim()
      .replace(/\D/g, '')
      .replace(/[^-.0-9]/g, ''),
    10
  );
};

const formatPriceValue = (value?: string | number): string => {
  if (!value) return '';
  if (typeof value !== 'string') value = value.toString();
  return value.replace(/\./g, '');
};

export enum TimeUnit {
  years = 'y',
  months = 'M',
  weeks = 'w',
  days = 'd',
  hours = 'h',
  minutes = 'm',
  seconds = 's',
  milliseconds = 'ms',
}

export function compareTime(start: Moment, end: Moment, byUnit: TimeUnit) {
  let compareTime: number = 0;
  let diff = moment.duration(end.diff(start));
  switch (byUnit) {
    case TimeUnit.years:
      compareTime = diff.asYears();
      break;
    case TimeUnit.months:
      compareTime = diff.asMonths();
      break;
      break;
    case TimeUnit.weeks:
      compareTime = diff.asWeeks();
      break;
    case TimeUnit.days:
      compareTime = diff.asDays();
      break;
    case TimeUnit.hours:
      compareTime = diff.asHours();
      break;
    case TimeUnit.minutes:
      compareTime = diff.asMinutes();
      break;
    case TimeUnit.seconds:
      compareTime = diff.asSeconds();
      break;
    case TimeUnit.milliseconds:
      compareTime = diff.asMilliseconds();
      break;
    default:
      break;
  }
  return compareTime;
}

function onCallNumber(phone?: string) {
  if (!phone || !validatePhone(phone)) return;
  let phoneNumber: string = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported: boolean) => {
      if (!supported) {
        showAlert(TYPE.WARN, translate('warning.warning'), 'Điện thoại không được hỗ trợ');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err: any) => console.log(err));
}

const isImageCache = (image?: string): boolean => {
  if (image && image.includes('/temp/')) return true;
  return false;
};

export function _formatDatePromotionList(dateCreated: any) {
  let date_from = moment(`${dateCreated} 23:59:59`, 'DD/MM/YYYY h:mm:ss');
  let date_to = moment(new Date());
  let diff = date_from.diff(date_to);
  const diffDuration = moment.duration(diff).asMilliseconds();

  let txt = `${translate('promotionListFormatTime.left')} `;

  if (diffDuration < TIME_VALUE.MINUTE) {
    return {
      text: translate('promotionListFormatTime.expired'),
      isExpired: true,
    };
  }
  if (diffDuration < TIME_VALUE.HOUR) {
    return {
      text: `${txt}${moment.duration(diff).minutes()} ${translate(
        'promotionListFormatTime.minute'
      )}`,
    };
  }
  if (diffDuration < TIME_VALUE.DAY) {
    return {
      text: `${txt}${moment.duration(diff).hours()} ${translate('promotionListFormatTime.hour')}`,
    };
  }
  if (diffDuration <= TIME_VALUE.MONTH) {
    return {
      text: `${txt}${moment.duration(diff).days()} ${translate('promotionListFormatTime.day')}`,
    };
  }

  return {
    text: `${txt}${Math.floor(diff / TIME_VALUE.MONTH)} ${translate(
      'promotionListFormatTime.month'
    )}`,
  };
}

const converDateStartToHourAndDate = (dateStart: string) => {
  const FORMAT = 'hh:mm:ss DD/MM/YYYY';
  const time = moment(dateStart, FORMAT);
  const hour = `${time.get('h') < 10 ? '0' + time.get('h') : time.get('h')}:${
    time.get('m') < 10 ? '0' + time.get('m') : time.get('m')
  }`;
  const date = `${time.get('date')} ${translate('common.month')} ${
    time.get('month') + 1
  } ${translate('common.year')} ${time.get('y')}`;

  return {
    hour,
    date,
    day: time.get('day') - 1,
    isToday: moment().diff(time, 'days') - 1 === 0,
  };
};

const formatMY = (time: Moment = moment()) => {
  return time.format('MM/YYYY');
};

const formatDMY = (time: Moment = moment()) => {
  return time.format('DD/MM/YYYY');
};

const dateFromMY = (time: string) => moment(time, 'MM/YYYY');
const dateFromDMY = (time: string) => moment(time, 'DD/MM/YYYY');

const formatMillions = (price: number) => (price > 0 ? parseFloat((price / 10e5).toFixed(2)) : 0);

const reduceText = (text: string, count: number) => {
  return text.slice(0, count) + (text.length > count ? '...' : '');
};

/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function decimalAdjust(type: string, value: number, exp: number) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}

// Decimal round
const round10 = (value: number, exp: number) => decimalAdjust('round', value, exp);
// Decimal floor
const floor10 = (value: number, exp: number) => decimalAdjust('floor', value, exp);
// Decimal ceil
const ceil10 = (value: number, exp: number) => decimalAdjust('ceil', value, exp);

// floor 5
const floorFive = (value: number) => {
  if (value % 5 === 0) return value;
  const newValue = (value += 5 - (value % 5));
  return floorFive(newValue);
};

const shuffle = (array: string[]) => {
  var tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
};

const formatTimestamp = (timestamp: number) => {
  let date = new Date(timestamp * 1000);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hour: date.getHours(),
    minutes: date.getMinutes(),
    second: date.getSeconds(),
  };
};

const formatTimestampInDMY = (timestamp: number) => {
  const datetime = formatTimestamp(timestamp);
  return `${datetime.date > 9 ? datetime.date : `0${datetime.date}`}/${
    datetime.month > 9 ? datetime.month : `0${datetime.month}`
  }/${datetime.year}`;
};

const formatTimestampInMY = (timestamp: number) => {
  const datetime = formatTimestamp(timestamp);
  return `${datetime.month > 9 ? datetime.month : `0${datetime.month}`}/${datetime.year}`;
};

const formatTimestampInY = (timestamp: number) => {
  const datetime = formatTimestamp(timestamp);
  return `${datetime.year}`;
};

function DiffDate(dateCreated: any) {
  let date_from = moment(dateCreated);
  let date_to = moment(new Date());
  let diff = date_to.diff(date_from);
  const diffDuration = moment.duration(diff).asMilliseconds();
  if (diffDuration < TIME_VALUE.MINUTE) {
    return translate('formatTime.justNow');
  }
  if (diffDuration < TIME_VALUE.HOUR) {
    return `${moment.duration(diff).minutes()} ${translate('formatTime.minuteAgo')}`;
  }
  if (diffDuration < TIME_VALUE.DAY) {
    return `${moment.duration(diff).hours()} ${translate('formatTime.hourAgo')}`;
  }
  if (diffDuration <= TIME_VALUE.MONTH) {
    return `${moment.duration(diff).days()} ${translate('formatTime.dayAgo')}`;
  }
  if (diffDuration < TIME_VALUE.YEAR) {
    return `${Math.floor(diff / TIME_VALUE.MONTH)} ${translate('formatTime.monthAgo')}`;
  }
  return `${moment.duration(diff).years()} ${translate('formatTime.yearAgo')}`;
}

const validateName = (str: string): boolean => {
  const re = /[!$%^&*()+|~=`{}\[\]:\/;<>?,.@#]/;
  return re.test(str);
};

export const widthPercentageToDP = (widthPercent: string) => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((DimensionHelpers.width * elemWidth) / 100);
};

export const heightPercentageToDP = (heightPercent: string) => {
  // Parse string percentage input and convert it to number.
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((DimensionHelpers.height * elemHeight) / 100);
};

export const capitalizeWords1 = (str: string): string => {
  try {
    return str.replace(/\w\S*/g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } catch (error) {
    return str;
  }
};

export const capitalizeWords = (str: string): string => {
  try {
    return str
      .split(' ')
      .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
      .join(' ');
  } catch (error) {
    return str;
  }
};

/**
 * Logout
 */
export const logout = (forceLogout = false, func: any) => {
  Alert.alert(
    translate('warning.title'),
    translate('logout.content'),
    [
      { text: translate('common.yes'), onPress: () => clearUserInfo(func) },
      { text: translate('common.no'), onPress: () => console.log('no') },
    ],
    { cancelable: true }
  );
};
const clearUserInfo = async (func: any) => {
  // showLoading();
  await AsyncStorageHelpers.remove(StorageKey.USER_INFO);
  // await AsyncStorageHelpers.remove(StorageKey.DEVICE_INFO);
  // Remove user redux
  func();
  // hideLoading();
  NavigationService.reset(AuthenNavigator);
};

export {
  isBlank,
  _formatPrice,
  capitalizeFirstLetter,
  normalize,
  // getImage,
  isEmpty,
  validatePhone,
  change_alias,
  formatCurrency,
  formatFromCurrencyToString,
  onCallNumber,
  formatPriceValue,
  isValiEmpty,
  isImageCache,
  converDateStartToHourAndDate,
  formatMY,
  dateFromMY,
  formatDMY,
  dateFromDMY,
  formatMillions,
  reduceText,
  shuffle,
  floorFive,
  formatTimestamp,
  formatTimestampInDMY,
  formatTimestampInMY,
  formatTimestampInY,
  DiffDate,
  // getBaseImage,
  validateName,
};
