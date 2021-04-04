import { Platform, StatusBar, Dimensions } from 'react-native';

export function statusBarHeight(safe: boolean = true) {
  return Platform.OS === 'ios' ? getStatusBarHeight(safe) : StatusBar.currentHeight || 0;
}

export function bottomSpaceHeight() {
  return Platform.OS === 'ios' ? getBottomSpace() / 2 : 0;
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}

export function getStatusBarHeight(safe?: boolean) {
  return Platform.select({
    ios: isIphoneX() ? (safe ? 44 : 30) : 20,
    android: StatusBar.currentHeight,
    default: 0,
  });
}
export function isIphoneX(): boolean {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812 || dimen.height === 896 || dimen.width === 896)
  );
}
