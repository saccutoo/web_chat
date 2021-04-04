import SplashScreen from 'features/splash/splash.screen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthenNavigator from './authen-navigator';
import * as screenName from './screen-name';
import { BottomTab } from './tab-navigator';
import { ChatDetailScreen } from 'features/chat-detail';
import { ProfileScreen } from 'features/profile';
import { SearchScreen } from 'features/search';
import { VideoCallScreen } from 'features/video-call';
import { NewMessageScreen } from 'features/new-message';
import { CreateGroupScreen } from 'features/create-group';
import { IncomingCallScreen } from 'features/incoming-call';
import { ViewPhotoScreen } from 'features/view-photo';
import { ProfileOthersScreen } from 'features/profile-others';
import { ProfileGroupScreen } from 'features/profile-group';
import { AddMembersScreen } from 'features/add-members';
import { NotificationScreen } from 'features/notification';

const mainStack = createStackNavigator(
  {
    // [screenName.SplashScreen]: SplashScreen, // Màn hình Splash
    [screenName.AuthenNavigator]: AuthenNavigator,
    [screenName.ChatDetailScreen]: ChatDetailScreen,
    [screenName.BottomTab]: BottomTab,
    [screenName.ProfileScreen]: ProfileScreen,
    [screenName.SearchScreen]: SearchScreen,
    [screenName.VideoCallScreen]: VideoCallScreen,
    [screenName.NewMessageScreen]: NewMessageScreen,
    [screenName.CreateGroupScreen]: CreateGroupScreen,
    [screenName.IncomingCallScreen]: IncomingCallScreen,
    [screenName.ViewPhotoScreen]: ViewPhotoScreen,
    [screenName.ProfileOthersScreen]: ProfileOthersScreen,
    [screenName.ProfileGroupScreen]: ProfileGroupScreen,
    [screenName.AddMembersScreen]: AddMembersScreen,
    [screenName.NotificationScreen]: NotificationScreen
  },
  {
    initialRouteName: screenName.AuthenNavigator,
    mode: 'card',
    headerMode: 'none',
  }
);
const MainNavigation = createAppContainer(mainStack);
export default MainNavigation;
