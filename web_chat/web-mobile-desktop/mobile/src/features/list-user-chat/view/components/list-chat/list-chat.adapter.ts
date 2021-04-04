/*
    Created by longdq
*/
import { ListChatComponent } from './list-chat.component';

export class ListChatAdapter {
  private ListChatComponent: ListChatComponent;

  constructor(Component: ListChatComponent) {
    this.ListChatComponent = Component;
  }

  // onRefresh = () => {
  //   console.log('test_onRefresh');
  // };

  // onEndReached = () => {
  //   console.log('test_onEndReached');
  //   const { dataListChat } = this.ListChatComponent.props;
  //   const { loading } = this.ListChatComponent.state;
  //   let { page, ITEM_PAGE } = this.ListChatComponent;
  //   if (loading || dataListChat.length < page * ITEM_PAGE) return;
  //   page += 1;
  //   //Call url with new page
  // };
}
