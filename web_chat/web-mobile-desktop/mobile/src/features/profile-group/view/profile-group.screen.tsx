/* 
    Created by longdq
*/

import ProfileGroupAdapter from 'core/model-profile-group/profile-group.adapter';
import { ProfileGroupProps } from 'core/model-profile-group/profile-group.props';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import { AppStatusBarComponent } from 'libraries/main/container/app-status-bar/app-status-bar.component';
import { NotifiOnOffComponent } from 'libraries/notifi-on-off/notifi-on-off.component';
import * as React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { TabBar, TabView } from 'react-native-tab-view';
// import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import NavigationService from 'routers/navigation-service';
import colors from 'res/colors';
import { translate } from 'res/languages';
import svgs from 'res/svgs';
import { ListUserGroupComponent } from './components/list-user-group/list-user-group.component';
import { AddMembersScreen } from 'routers/screen-name';
import { useEffect } from 'react';
import { APP_CONFIGS } from 'core/common/app-config';
import { HyperUtils } from 'core/common/hyper-utils';
import { ListImageGroupComponent } from './components/list-image-group/list-image-group.component';
import { ListDocumentGroupComponent } from './components/list-document-group/list-document-group.component';
import { ListLinkGroupComponent } from './components/list-link-group/list-link-group.component';
import { GetUserConversationRes } from 'core/common/types/base-response';
import { processRequestRespository } from 'core/common/networking/api-helper';
import ProfileGroupServices from 'core/model-profile-group/profile-group.services';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';

export const ProfileGroupContainer = (props: ProfileGroupProps) => {
  const navigation = props.navigation;
  const {
    chatInfo,
    index,
    dataInfoGr,
    routes,
    getInfo,
    goToChatDetail,
    // removeUserGr,
    setIndex,
    goToPhotoDetail,
  } = ProfileGroupAdapter(props);

  const info = navigation?.getParam('chatInfo');
  const { userInfo } = props;
  const modalRef = React.createRef<ModalDeleteComponent>();

  //Call back
  useEffect(() => {
    StatusBar.setBackgroundColor(colors.primaryColor);
    StatusBar.setBarStyle('light-content');
    getInfo;
    console.log('PROFILE GROUP SCREEN :', info);
  }, []);

  useEffect(() => {
    return () => {
      StatusBar.setBackgroundColor(colors.white);
      StatusBar.setBarStyle('dark-content');
    };
  }, []);

  const goToAddMembers = () => {
    const chatId  = info?.data.id;
    console.log("GO TO ADD MEMBER SCREEN :", chatId);
    
    NavigationService.navigate(AddMembersScreen, { chatId: chatId });
  };

  const clearUserInfogoBack = () => {
    NavigationService.goBack();
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={{ backgroundColor: '#fff', elevation: 0 }}
      labelStyle={{ fontSize: 14, textTransformations: 'none' }}
      getLabelText={({ route }) => route.title}
      activeColor={colors.primaryColor}
      inactiveColor="#4D5971"
    />
  );

  const renderScene = ({ route, jumpTo }) => {
    console.log('hehe', route);
    switch (route.key) {
      case '1':
        return (
          <ListUserGroupComponent
            dataInfoGr={dataInfoGr}
            goToChatDetail={goToChatDetail}
            removeUserGr={showModal}
            // openModal={showModal}
            roomId={info.data.id}
            userInfo={userInfo}
          />
        );
      case '2':
        // return <View style={[styles.scene, { backgroundColor: colors.white, flex: 1 }]} />;
        return <ListImageGroupComponent roomId={info.data.id} goToPhotoDetail={goToPhotoDetail} />;

      case '3':
        return <ListDocumentGroupComponent chatRoomId={info.data.id} />;
      case '4':
        return <ListLinkGroupComponent chatRoomId={info.data.id} />;
    }
  };

  // -----------------------
  const removeUserGr = (item: GetUserConversationRes) => {
    const chatId = info.data.id;
    const userId = item && item.id;
    const userIdSend = userInfo.user.id;
    console.log(
      'REMOVE USER FROM CONVERSATION :',
      userId,
      '-------',
      chatId,
      '----------',
      userIdSend
    );

    if (chatId && userId) {
      processRequestRespository(
        ProfileGroupServices.getInstance().removeUserGr(userId, chatId, userIdSend),
        removeUserSuccess
      );
    }
  };

  const removeUserSuccess = (res: any) => {
    modalRef.current?.hideModal();
    res && getInfo;
  };

  // ---------------------------

  const showModal = (item: any) => {
    modalRef.current?.showModal(item);
  };

  return (
    <View style={{ flex: 1 }}>
      <AppStatusBarComponent />
      <View style={styles.wrapInfo}>
        <View style={styles.wrapHeader}>
          <HyperButtonComponent img={svgs.ic_back} onPress={clearUserInfogoBack} />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 24 }}>
              <HyperButtonComponent img={svgs.ic_pen_24} />
            </View>
            <HyperButtonComponent img={svgs.ic_more_vertical} />
          </View>
        </View>
        <View style={styles.wrapImage}>
          {info.data.avatar != '' ? (
            <Image
              source={{
                uri: APP_CONFIGS.SERVER_FILE + info.data.avatar,
              }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarNone}>
              <Text style={{ color: colors.primaryColor, fontSize: 32, fontWeight: 'bold' }}>
                {info.data.title && HyperUtils.capitalFirstCharacter(info.data.title)}
              </Text>
            </View>
          )}
          <Text style={styles.title}>{info.data.title}</Text>
        </View>
      </View>
      <View style={{ marginTop: 16 }}>
        <NotifiOnOffComponent />
        <View style={styles.line} />
      </View>
      <TouchableOpacity onPress={goToAddMembers}>
        <View style={styles.wrapAddMember}>
          <SvgXml xml={svgs.ic_add} width={40} height={40} />
          <Text style={styles.txtAddMember}>{translate('createGr.addMember')}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.wrapTab}>
        <TabView
          navigationState={{
            index: index,
            routes: [
              { key: '1', title: 'Thành viên' },
              { key: '2', title: 'Hình ảnh' },
              { key: '3', title: 'Tài liệu' },
              { key: '4', title: 'Link' },
            ],
          }}
          onIndexChange={(i) => {
            setIndex(i);
          }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
        />
      </View>
      <ModalDeleteComponent ref={modalRef} confirm={removeUserGr} />
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  line: {
    height: 1,
    width: '100%',
    marginHorizontal: 16,
    backgroundColor: '#E6E8EB',
    marginTop: 5,
  },
  scene: {
    flex: 1,
  },
  indicatorStyle: {
    backgroundColor: colors.primaryColor,
    height: 3,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  labelStyle: {},
  wrapAddMember: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  txtAddMember: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#1A2948',
  },
  wrapTab: {
    flex: 1,
    marginTop: 9,
    // marginHorizontal: 16,
  },
});
