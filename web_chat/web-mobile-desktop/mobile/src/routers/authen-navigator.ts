import { LoginOldScreen } from 'features/login-old';
import { createStackNavigator } from 'react-navigation-stack';
import * as screenName from 'routers/screen-name';
import { BottomTab } from './tab-navigator';
import { InputDomainScreen } from 'features/input-domain';
const AuthenNavigator = createStackNavigator(
  {
    [screenName.InputDomainScreen]: InputDomainScreen,
    [screenName.LoginOldScreen]: LoginOldScreen,
  },
  {
    // initialRouteName: screenName.IncomingCallScreen,
    headerMode: 'none',
  }
);
export default AuthenNavigator;
