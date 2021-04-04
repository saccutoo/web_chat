/* 
    Created by longdq
*/

import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import { AppStatusBarComponent } from 'libraries/main/container/app-status-bar/app-status-bar.component';
import { NotifiOnOffComponent } from 'libraries/notifi-on-off/notifi-on-off.component';
import * as React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import NavigationService from 'routers/navigation-service';
import colors from 'res/colors';
import svgs from 'res/svgs';
import ProfileOthersAdapter from 'core/model-profile-others/profile-others.adapter';
import { useEffect, useState } from 'react';
import { ProfileOthersProps } from '../../../core/model-profile-others/profile-others.props';
import { APP_CONFIGS } from 'core/common/app-config';
import { HyperUtils } from 'core/common/hyper-utils';

export const ProfileOthersContainer = (props: ProfileOthersProps) => {
  const { navigation } = props;
  //Local States
  const [index, setIndex] = useState<number>(0);
  const [routes, setRoutes] = useState<Object>([
    { key: '1', title: 'First' },
    { key: '2', title: 'Second' },
  ]);
  // var info: any;
  const info = navigation?.getParam('user');

  //Call back
  useEffect(() => {
    console.log('test_profile_other_screen...', props);

    console.log('USER PROFILE OTHER SCREEN :', info);

    StatusBar.setBackgroundColor(colors.primaryColor);
    StatusBar.setBarStyle('light-content');
  }, []);

  useEffect(() => {
    return () => {
      StatusBar.setBackgroundColor(colors.white);
      StatusBar.setBarStyle('dark-content');
    };
  }, []);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: colors.primaryColor,
        height: 3,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      }}
      style={{ backgroundColor: '#fff' }}
      labelStyle={{ fontSize: 14, textTransformations: 'none' }}
      getLabelText={({ route }) => route.title}
      activeColor={colors.primaryColor}
      inactiveColor="#4D5971"
    />
  );

  const renderScene = ({ route, jumpTo }) => {
    console.log('hehe', route);
    switch (route.key) {
      case 'First':
        return <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />;
      case 'Second':
        return <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />;
    }
  };

  const FirstRoute = () => <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />;

  const SecondRoute = () => <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />;

  const goBack = () => {
    NavigationService.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <AppStatusBarComponent />
      <View style={styles.wrapInfo}>
        <View style={styles.wrapHeader}>
          <HyperButtonComponent onPress={goBack} img={svgs.ic_back} />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 24 }}>
              <HyperButtonComponent img={svgs.ic_message} />
            </View>
            <HyperButtonComponent img={svgs.ic_video_call} />
          </View>
        </View>
        <View style={styles.wrapImage}>
          {info?.data?.avatar != '' ? (
            <Image
              source={{
                uri: APP_CONFIGS.SERVER_FILE + info?.avatar,
              }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarNone}>
              <Text style={{ color: colors.primaryColor, fontSize: 32, fontWeight: 'bold' }}>
                {info?.userName && HyperUtils.capitalFirstCharacter(info?.userName)}
              </Text>
            </View>
          )}
          <Text style={styles.title}>{info.userName}</Text>
        </View>
      </View>
      <View style={{ marginTop: 16 }}>
        <NotifiOnOffComponent />
        <View style={styles.line} />
      </View>
      <View style={{ flex: 1, marginTop: 9, paddingHorizontal: 16 }}>
        <TabView
          navigationState={{
            index: index,
            routes: [
              { key: '1', title: 'Hình ảnh' },
              { key: '2', title: 'Tài liệu' },
              { key: '3', title: 'Link' },
            ],
          }}
          onIndexChange={(i) => {
            setIndex(i);
          }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

//Styles
const styles = StyleSheet.create({
  container: {},
  wrapInfo: {
    height: 155,
    width: '100%',
    backgroundColor: colors.primaryColor,
  },
  wrapHeader: {
    height: 56,
    width: '100%',
    // marginTop: 44,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapImage: {
    marginTop: 7,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 16,
  },
  line: {
    height: 1,
    width: '100%',
    marginHorizontal: 16,
    backgroundColor: '#E6E8EB',
    marginTop: 5,
  },
  avatarNone: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // color: colors.primaryColor
  },
  scene: {
    flex: 1,
  },
});
