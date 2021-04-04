/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListUserGroupProps } from './list-user-group.props';
import { ListUserGroupAdapter } from './list-user-group.adapter';
import { ItemUserGroupComponent } from './item-user-group/item-user-group.component';
import { processRequestRespository } from 'core/common/networking/api-helper';
import ProfileGroupServices from 'core/model-profile-group/profile-group.services';
import { User2 } from 'core/common/types/user';
import { GetUserConversationRes } from 'core/common/types/base-response';
import { InfinityScrollComponent } from 'libraries/infinity-scroll/infinity-scroll.component';

interface State {
  listUser: GetUserConversationRes[];
}
export class ListUserGroupComponent extends PureComponent<ListUserGroupProps, State> {
  private ListUserGroupAdapter: ListUserGroupAdapter;
  constructor(props: ListUserGroupProps) {
    super(props);
    this.ListUserGroupAdapter = new ListUserGroupAdapter(this);

    this.state = {
      listUser: [],
    };
  }

  componentDidMount() {
    // this.getUserConversation();
  }

  // get user of conversation
  // getUserConversation = () => {
  //   processRequestRespository(
  //     ProfileGroupServices.getInstance().getMemberGroup({
  //       chatRoomId: this.props.roomId,
  //       userId: '',
  //       pageParams: { page: 1, pageSize: 15 },
  //     }),
  //     this.getUserConversationSuccess
  //   );
  // };

  getUserConversationSuccess = (res: GetUserConversationRes[]) => {
    console.log('GET USER OF CONVERSATION :', res);
    this.setState({ listUser: res });
  };

  renderItem = (item: GetUserConversationRes) => {
    return (
      <ItemUserGroupComponent
        item={item}
        goToChatDetail={this.props.goToChatDetail}
        removeUserGr={this.props.removeUserGr}
        // opemModal = {this.props.openModal}
      />
    );
  };

  param = { chatRoomId: this.props.roomId, userId: '' };

  render() {
    const { dataInfoGr, goToChatDetail, removeUserGr } = this.props;
    if (dataInfoGr && dataInfoGr.users) {
      return (
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          {/* <FlatList
            data={this.state.listUser}
            renderItem={({ item }) => (
              <ItemUserGroupComponent
                item={item}
                goToChatDetail={goToChatDetail}
                removeUserGr={removeUserGr}
              />
            )}
            ListFooterComponent={() => <View style={{ height: 40, width: '100%' }} />}
          /> */}
          <InfinityScrollComponent
            renderItem={this.renderItem}
            param={this.param}
            serviceGetData={ProfileGroupServices.getInstance().getMemberGroup}
          />
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {},
});
