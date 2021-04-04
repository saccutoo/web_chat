import { StyleProp, ViewStyle, ScrollViewProps } from 'react-native';

export interface ScrollProps extends ScrollViewProps {
  onEndReached?: any;
  refreshControl?: any;
  style?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
  onRefresh?: () => void;
}

export interface CloseToBottomProps {
  layoutMeasurement: {
    height: number;
  };
  contentOffset: {
    y: number;
  };
  contentSize: {
    height: number;
  };
}
