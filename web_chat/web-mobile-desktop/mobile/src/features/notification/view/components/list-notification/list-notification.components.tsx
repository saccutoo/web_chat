import { GetNotificationRes } from 'core/common/types/base-response';
import * as React from 'react';
import { FlatList, Text, View } from 'react-native';
import { ListNotificationItemComponent } from './list-notification-item/list-notification-item.component';
import { ListNotificationProps } from './list-notification.props';

export class ListNotificationComponent extends React.PureComponent<ListNotificationProps> {
  constructor(props: ListNotificationProps) {
    super(props);
  }

  renderItemList = (item: GetNotificationRes) => {
    return <ListNotificationItemComponent item={item} />;
  };

  render() {
    const { dataListNotification } = this.props;
    return (
      <View>
        {/* <ListNotificationItemComponent isSeen={true} notification_type={1} />
        <ListNotificationItemComponent isSeen={false} notification_type={2} />
        <ListNotificationItemComponent isSeen={true} notification_type={3} />
        <ListNotificationItemComponent isSeen={false} notification_type={0} /> */}
        <FlatList
          data={dataListNotification}
          renderItem={({ item }) => this.renderItemList(item)}
        />
      </View>
    );
  }
}
