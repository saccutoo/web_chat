import { ListUserChatScreen } from 'features/list-user-chat';
import Tab2Screen from 'features/tab2/view/tab2.screen';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import colors from 'res/colors';
import svgs from 'res/svgs';
import * as screenName from 'routers/screen-name';
import { ChatDetailScreen } from 'features/chat-detail';
import { ListMembersScreen } from 'features/list-members';
import { translate } from '/res/languages';

export const BottomTab = createMaterialBottomTabNavigator(
  {
    [screenName.ListUserChatScreen]: {
      screen: ListUserChatScreen,
      navigationOptions: ({ navigation }) => ({
        title: translate('tabBar.chat'),
        tabBarIcon: ({ focused }) => {
          const xml = focused ? svgs.tab.ic_chat : svgs.tab.ic_chat_unselect;
          return <SvgXml xml={xml} />;
        },
      }),
    },
    [screenName.ListMembersScreen]: {
      screen: ListMembersScreen,
      navigationOptions: ({ navigation }) => ({
        title: translate('tabBar.groupChat'),
        tabBarIcon: ({ focused }) => {
          const xml = focused ? svgs.tab.ic_contact : svgs.tab.ic_contact_unselect;
          return <SvgXml xml={xml} />;
        },
      }),
    },
  },
  {
    initialRouteName: screenName.ListUserChatScreen,
    activeColor: colors.primaryColor,
    inactiveColor: colors.black,
    barStyleLight: {
      backgroundColor: '#fff',
    },
  }
);
