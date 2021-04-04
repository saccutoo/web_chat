import { ViewStyle } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { ReactNode } from 'react';
import { HeaderTypes } from '../../../types/header-types';
import { ChatInfoParams } from 'core/model-chat-detail/chat-detail.props';

export interface ContainerProps {
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
  title?: string;
  onBack?: () => void;
  style?: ViewStyle;
  children: ReactNode;
  noKeyboardAvoidingView?: boolean;
  headerType?: HeaderTypes;
  onPressRight?: () => void;
  //Chat detail
  chatInfo?: ChatInfoParams;
  videoCall?: () => void;
  isDark?: boolean
}
