/* 
    Created by thaolt
*/
import { ActionMenuItemComponent } from './action-menu-item.component';
import { MenuItem } from '../action-menu/action-menu.props';
import EventBus, { EventBusName } from 'core/common/event-bus';

export class ActionMenuItemAdapter {
  private ActionMenuItemComponent: ActionMenuItemComponent;

  constructor(Component: ActionMenuItemComponent) {
    this.ActionMenuItemComponent = Component;
  }

  onItem = (item: MenuItem) => {
    console.log('test_item: ', item);
    switch (item.id) {
      case 1:
        EventBus.getInstance().post({
          type: EventBusName.CHAT_DETAIL_ACTION_ANSWER,
          payload: {},
        });
        break;
      case 2:
        EventBus.getInstance().post({
          type: EventBusName.CHAT_DETAIL_ACTION_EDIT,
          payload: {},
        });
        break
      case 3:
        EventBus.getInstance().post({
          type: EventBusName.CHAT_DETAIL_ACTION_COPY,
          payload: {},
        });
        break;
      default:
        EventBus.getInstance().post({
          type: EventBusName.CHAT_DETAIL_ACTION_REMOVE,
          payload: {},
        });
        break;
    }
  };
}
