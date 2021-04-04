import NotificationAdapter from 'core/model-notification/notification.adapter';
import { NotificationProps } from 'core/model-notification/notification.props';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListNotificationComponent } from './components/list-notification/list-notification.components';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import NavigationService from 'routers/navigation-service';

export const NotificationContainer = (props: NotificationProps) => {
  //   console.log('NOTIFICATION SCREEN :');

  console.log('NOTIFICATION SCREEN :', props);

  //  const userInfo =
  const { getListNotification, dataListNotification } = NotificationAdapter(props);

  React.useEffect(() => {
    getListNotification();
  }, []);

  // go back

  const goBack = () => {
    NavigationService.goBack();
  };

  return (
    <View style={styles.container}>
      <ToolbarComponent goBack={goBack} />
      <ListNotificationComponent dataListNotification={dataListNotification} />
    </View>
  );
};

// Styles

const styles = StyleSheet.create({
  container: {},
});
