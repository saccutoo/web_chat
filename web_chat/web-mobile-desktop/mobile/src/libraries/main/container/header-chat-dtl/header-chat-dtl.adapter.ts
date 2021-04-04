import NavigationService from 'routers/navigation-service';
import { ProfileScreen, ProfileOthersScreen, ProfileGroupScreen } from 'routers/screen-name';
/* 
    Created by thaolt
*/
import { HeaderChatDtlComponent } from './header-chat-dtl.component';
import { HyperUtils } from '../../../../core/common/hyper-utils';

export class HeaderChatDtlAdapter {
  private HeaderChatDtlComponent: HeaderChatDtlComponent;

  constructor(Component: HeaderChatDtlComponent) {
    this.HeaderChatDtlComponent = Component;
  }

  goToProfile = () => {
    const chatInfo = this.HeaderChatDtlComponent.props.chatInfo;
    console.log('test_goToProfile: ', chatInfo);
    if (chatInfo && chatInfo.type === 'FROM_USER') {
      const tmpUser = chatInfo.data
      tmpUser && NavigationService.navigate(ProfileOthersScreen, { user: tmpUser });
    } else {
      chatInfo && NavigationService.navigate(ProfileGroupScreen, { chatInfo: chatInfo });
    }
  };

  getTitleAvt = () => {
    const chatInfo = this.HeaderChatDtlComponent.props.chatInfo;
    if (chatInfo && chatInfo.type == 'FORM_MESSAGE') {
      return chatInfo.data && chatInfo.data.nameTitle && chatInfo.data.nameTitle[0];
    }
    if (chatInfo && chatInfo.type == 'FROM_USER') {
      return chatInfo.data && chatInfo.data.username && chatInfo.data.username[0];
    }
  };

  getTitle = () => {
    const chatInfo = this.HeaderChatDtlComponent.props.chatInfo;
    if (chatInfo && chatInfo.type == 'FORM_MESSAGE') {
      return chatInfo.data && chatInfo.data.nameTitle;
    }
    if (chatInfo && chatInfo.type == 'FROM_USER') {
      return chatInfo.data && chatInfo.data.username;
    }
  };
}
