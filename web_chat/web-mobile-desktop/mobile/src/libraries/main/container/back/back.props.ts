import { ViewStyle } from 'react-native';

export interface BackProps {
  goBack(): void;
  style?: ViewStyle;
  title?: string;
  iconRight?: string;
  onPressRight?: () => void;
}
