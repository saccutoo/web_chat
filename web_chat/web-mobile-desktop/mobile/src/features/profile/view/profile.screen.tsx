/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import ProfileAdapter from 'core/model-profile/profile.adapter';
import { ProfileProps } from 'core/model-profile/profile.props';
import { ProfileStates } from 'core/model-profile/profile.states';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import NavigationService from 'routers/navigation-service';
import colors from 'res/colors';
import { AppStatusBarComponent } from 'libraries/main/container/app-status-bar/app-status-bar.component';
import { User } from '../../../core/common/types/user';
import { logout } from 'helpers/utils';
import { useEffect } from 'react';

export const ProfileContainer = (props: ProfileProps) => {
  ProfileAdapter: ProfileAdapter;
  // user: User = null;
  // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  // constructor(props: ProfileProps) {
  //   super(props);
  //   this.ProfileAdapter = new ProfileAdapter(this);
  //   this.state = {};

  //   this.navigation = props.navigation;
  //   this.user = this.navigation.getParam('user');
  // }

  const navigation = props.navigation;
  const user = navigation.getParam('user');
  console.log('USER INFO SCREEN :', user);
  

  // componentDidMount() {
  //   StatusBar.setBackgroundColor(colors.primaryColor);
  //   StatusBar.setBarStyle('light-content');
  // }

  // componentWillUnmount() {
  //   StatusBar.setBackgroundColor(colors.white);
  //   StatusBar.setBarStyle('dark-content');
  // }

  useEffect(() => {
    StatusBar.setBackgroundColor(colors.primaryColor);
    StatusBar.setBarStyle('light-content');

    return () => {
      StatusBar.setBackgroundColor(colors.white);
      StatusBar.setBarStyle('dark-content');
    };
  }, []);

  function goBack() {
    NavigationService.goBack();
  }

  function logOut() {
    logout(undefined, props.removeUserInfoAction);
  }

  // render() {
  return (
    <View>
      <AppStatusBarComponent />
      <ProfileInfoComponent userInfo={user} logout={logOut} goBack={goBack} />
    </View>
  );
};
// }

//Styles
const styles = StyleSheet.create({
  container: {},
});
