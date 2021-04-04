import { ViewStyle } from 'react-native';
import { ChatInfoParams } from 'core/model-chat-detail/chat-detail.props';

/* 
    Created by thaolt
*/

export interface HeaderChatDtlProps {
  goBack(): void;
  style?: ViewStyle;
  title?: string;
  iconRight?: string;
  onPressRight?: () => void;
  chatInfo?: ChatInfoParams;
  // goToProfile?: () => void;
  videoCall?: () => {};
}
