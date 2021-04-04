/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ContainerComponent } from 'libraries/main/container/container.component';
import NewMessageAdapter from 'core/model-new-message/new-message.adapter';
import { NewMessageProps } from 'core/model-new-message/new-message.props';
import { HeaderTypes } from 'types/header-types';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { SearchComponent } from './components/search/search.component';
import { SearchListUserComponent } from './components/search-list-user/search-list-user.component';
import NavigationService from 'routers/navigation-service';
import { translate } from 'res/languages';
import { ChatDetailScreen, CreateGroupScreen } from 'routers/screen-name';
import { TypeParam } from 'core/model-chat-detail/chat-detail.props';
import { User, User2 } from 'core/common/types/user';
import { useEffect } from 'react';

export const NewMessageContainer = (props: NewMessageProps) => {
  // NewMessageAdapter: NewMessageAdapter;
  // //Local States

  // page: number = 1;
  // ITEM_PAGE = 15;

  // constructor(props: NewMessageProps) {
  //   super(props);
  //   this.NewMessageAdapter = new NewMessageAdapter(this);
  //   this.state = {
  //     dataSearchUser: [],
  //     loading: false,
  //     txt: '',
  //   };
  // }

  const {
    page,
    ITEM_PAGE,
    setTxtSearch,
    searchUser,
    loading,
    txt,
    onRefresh,
    dataSearchUser,
    onEndReached,
    searchUserSuccess,
  } = NewMessageAdapter(props);

  // componentDidMount = () => {
  //   this.searchUser();
  // };

  useEffect(() => {
    searchUser();
  }, []);

  const goToChatDetail = (item: User2) => {
    NavigationService.navigate(ChatDetailScreen, {
      chatInfo: { data: item, type: TypeParam.FROM_USER },
    });
  };

  const goToCreateGr = () => {
    NavigationService.navigate(CreateGroupScreen);
  };

  // render() {
  //   const { dataSearchUser } = this.state;

  return (
    <ContainerComponent
      style={styles.container}
      title={translate('newMess.newMess')}
      headerType={HeaderTypes.BACK_TITLE}
    >
      <NewGroupComponent goToCreateGr={goToCreateGr} />
      <SearchComponent search={setTxtSearch} />
      <SearchListUserComponent
        dataSearchUser={dataSearchUser}
        goToChatDetail={goToChatDetail}
        loading={loading}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        page={page}
        ITEM_PAGE={ITEM_PAGE}
        value={txt}
      />
    </ContainerComponent>
  );
};
// }

//Styles
const styles = StyleSheet.create({
  container: {},
});
