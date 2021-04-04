/* 
    Created by thaolt
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ChatActionsProps } from './chat-actions.props';
import { ChatActionsAdapter } from './chat-actions.adapter';
import Modal from 'react-native-modalbox';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { MenuItem } from './components/action-menu/action-menu.props';
import images from 'res/images';
import { SafeAreaView } from 'react-navigation';
import svgs from '../../../../../res/svgs';
import { translate } from '../../../../../res/languages';
import { ChatActionsStates } from './chat-actions.states';

export class ChatActionsComponent extends PureComponent<ChatActionsProps, ChatActionsStates> {
  refModalChatActions = React.createRef<Modal>();
  private ChatActionsAdapter: ChatActionsAdapter;
  constructor(props: ChatActionsProps) {
    super(props);
    this.state = {
      items: [],
    };
    this.ChatActionsAdapter = new ChatActionsAdapter(this);
  }

  openModal = (isMe: boolean) => {
    console.log('test_openModal: ', isMe);
    this.setState(
      {
        items: isMe ? this.itemRight : this.itemLeft,
      },
      () => this.refModalChatActions.current?.open()
    );
  };

  itemLeft: MenuItem[] = [
    { id: 1, icon: svgs.actionMenu.ic_answer, text: translate('actionMenu.answer') },
    { id: 3, icon: svgs.actionMenu.ic_copy, text: translate('actionMenu.copy') },
  ];

  itemRight: MenuItem[] = [
    { id: 2, icon: svgs.actionMenu.ic_edit, text: translate('actionMenu.edit') },
    { id: 3, icon: svgs.actionMenu.ic_copy, text: translate('actionMenu.copy') },
    { id: 4, icon: svgs.actionMenu.ic_remove, text: translate('actionMenu.remove') },
  ];

  render() {
    const { items } = this.state;
    return (
      <Modal
        style={styles.modal}
        position={'bottom'}
        ref={this.refModalChatActions}
        swipeToClose={false}
      >
        <ActionMenuComponent listItem={items} />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    // backgroundColor:'transparent'
  },
});
