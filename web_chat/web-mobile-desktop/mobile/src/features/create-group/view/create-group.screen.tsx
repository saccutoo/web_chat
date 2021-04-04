/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ContainerComponent } from 'libraries/main/container/container.component';
import CreateGroupAdapter from '/core/model-create-group/create-group.adapter';
import { CreateGroupProps } from '/core/model-create-group/create-group.props';
// import { CreateGroupStates } from '/core/model-create-group/create-group.states';
import { HeaderTypes } from 'types/header-types';
import { GroupInfoComponent } from './components/group-info/group-info.component';
import { SearchComponent } from './components/search/search.component';
import { SearchListUserComponent } from './components/search-list-user/search-list-user.component';
import { ListUserCheckComponent } from './components/list-user-check/list-user-check.component';
import { translate } from 'res/languages';
import { hideLoading, showLoading } from 'libraries/loading/loading-modal';
import NavigationService from 'routers/navigation-service';
import EventBus, { EventBusName } from 'core/common/event-bus';
import { itemDataCheck } from './components/search-list-user/item-list-user/item-list-user.component';
import { processRequestRespository } from 'core/common/networking/api-helper';
import CreateGroupServices from 'core/model-create-group/create-group.services';
import { useEffect } from 'react';
import { KindOfMsg } from 'core/common/types/message';

export const CreateGroupContainer = (props: CreateGroupProps) => {
  // CreateGroupAdapter: CreateGroupAdapter;
  // //Local States

  // page: number = 1;
  // ITEM_PAGE = 15;

  // constructor(props: CreateGroupProps) {
  //   super(props);
  //   this.CreateGroupAdapter = new CreateGroupAdapter(this);
  //   this.state = {
  //     dataSearchUser: [],
  //     dataUserCheck: [],
  //     nameGr: '',
  //     emptyNameGr: false,
  //     loading: false,
  //     txt: '',
  //   };
  // }

  // componentDidMount = () => {
  //   this.CreateGroupAdapter.searchUser();
  // };

  const {
    onChangeText,
    emptyNameGr,
    setTxtSearch,
    dataSearchUser,
    addToDataCheck,
    loading,
    onEndReached,
    onRefresh,
    page,
    ITEM_PAGE,
    dataUserCheck,
    removeUserCheck,
    nameGr,
    setEmptyNameGr,
    searchUser,
    onChooseImage,
    imageGr,
    txt,

    // onCreateGr,
  } = CreateGroupAdapter(props);

  const { userInfo } = props;

  useEffect(() => {
    searchUser();
  }, []);

  // logic

  function createGrSuccess(res: any) {
    hideLoading();
    if (res) {
      // {Todo} --- gửi tin nhắn tạo nhóm vào room
      console.log('CREATE ROOM CHAT SUCCESS: ', res);
      createRoomMessage(res?.id, userInfo.user.id);

      NavigationService.popMany(2);
      EventBus.getInstance().post({
        type: EventBusName.RELOAD_LIST_CHAT,
        payload: 'RELOAD_LIST_CHAT',
      });
    }
  }

  function onCreateGr() {
    let listIdUser: any[] = [{ userId: userInfo.user.id }];
    // const data = this.CreateGroupContainer.state.dataUserCheck;
    const data = dataUserCheck;
    if (data && data.length > 0) {
      data.map((e: itemDataCheck) => {
        const id = e && e.item && e.item.id;
        listIdUser.push({ userId: id });
      });

      // const nameGr = this.CreateGroupContainer.state.nameGr;
      if (!nameGr) {
        // this.CreateGroupContainer.setState({
        //   emptyNameGr: true,
        // });
        setEmptyNameGr(true);
        return;
      }

      if (imageGr != undefined) {
        let formData = new FormData();
        formData.append('fileContent', imageGr);
        CreateGroupServices.getInstance()
          .uploadFile(formData)
          .then((res) => {
            console.log('UPLOAD FILE IMAGE GROUP: ', res.data);
            const dataPost = {
              title: nameGr,
              // members: listIdUser,
              chatRoomMemberList: JSON.stringify(listIdUser),
              createdBy: userInfo.user.id,
              avatar: res.data[0].guid,
              type: 1,
              // slogan: ''
            };
            showLoading();
            processRequestRespository(
              CreateGroupServices.getInstance().onCreateGr(dataPost),
              createGrSuccess
            );
          });
      } else {
        const dataPost = {
          title: nameGr,
          // members: listIdUser,
          chatRoomMemberList: JSON.stringify(listIdUser),
          createdBy: userInfo.user.id,
          avatar: '',
          type: 1,
          // slogan: ''
        };
        showLoading();
        processRequestRespository(
          CreateGroupServices.getInstance().onCreateGr(dataPost),
          createGrSuccess
        );
      }
    }
  }

  function createRoomMessage(roomId: string, userId: string) {
    const postData = {
      chatRoomId: roomId,
      message: 'Hãy chào mọi người trong nhóm của bạn',
      messageStatus: '1',
      messageType: KindOfMsg.SYSTEM,
      user: { userName: 'Test 1', status: '1' },
      // userId: '7JBbXOtJhieqbSpq0k00103E',
      userId: userId,
    };

    processRequestRespository(CreateGroupServices.getInstance().insertMessage(postData));
  }

  // render() {
  // const { dataSearchUser, dataUserCheck, emptyNameGr } = this.state;
  return (
    <ContainerComponent
      style={styles.container}
      title={translate('createGr.titleCreateGr')}
      headerType={HeaderTypes.BACK_TITLE}
    >
      <GroupInfoComponent
        onChangeText={onChangeText}
        emptyNameGr={emptyNameGr}
        onChooseImage={onChooseImage}
        imageGr={imageGr}
      />
      <SearchComponent search={setTxtSearch} />
      <SearchListUserComponent
        dataSearchUser={dataSearchUser}
        addToDataCheck={addToDataCheck}
        loading={loading}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        page={page}
        ITEM_PAGE={ITEM_PAGE}
        value={txt}
      />
      <ListUserCheckComponent
        dataUserCheck={dataUserCheck}
        removeUserCheck={removeUserCheck}
        onCreateGr={onCreateGr}
      />
    </ContainerComponent>
  );
};
// }

//Styles
const styles = StyleSheet.create({
  container: {},
});
