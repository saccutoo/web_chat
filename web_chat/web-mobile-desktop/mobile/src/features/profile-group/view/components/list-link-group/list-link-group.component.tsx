import { processRequestTrustRespository } from 'core/common/networking/api-helper';
import { GetLinkGroupRes } from 'core/common/types/base-response';
import ProfileGroupServices from 'core/model-profile-group/profile-group.services';
import { InfinityScrollComponent } from 'libraries/infinity-scroll/infinity-scroll.component';
import * as React from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import { ItemLinkGroupComponent } from './item-link-group.ts/item-link-group.component';
import { ListLinkGroupProps } from './list-link-group.props';

interface State {
  listLink: GetLinkGroupRes[];
}

export class ListLinkGroupComponent extends React.PureComponent<ListLinkGroupProps, State> {
  constructor(props: ListLinkGroupProps) {
    super(props);
    this.state = {
      listLink: [],
    };
  }

  // componentDidMount() {
  //   this.getLinkConversation();
  // }

  // // get attachment of conversation
  // getLinkConversation = () => {
  //   processRequestTrustRespository(
  //     ProfileGroupServices.getInstance().getLinkGroup({
  //       chatRoomId: this.props.chatRoomId,
  //       pageParams: { page: 1, pageSize: 15 },
  //     }),
  //     this.getLinkConversationSuccess
  //   );
  // };

  // getLinkConversationSuccess = (res: any) => {
  //   console.log('GET IMAGE OF CONVERSATION :', res);
  //   this.setState({ listLink: res?.data });
  // };

  renderItem = (item: GetLinkGroupRes) => {
    return <ItemLinkGroupComponent item={item} />;
  };

  param = { chatRoomId: this.props.chatRoomId };

  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* <FlatList
          data={this.state.listLink}
          renderItem={({ item }) => <ItemLinkGroupComponent item = {item} />}
          ListFooterComponent={() => <View style={{ height: 40, width: '100%' }} />}
        /> */}
        <InfinityScrollComponent
          renderItem={this.renderItem}
          param={this.param}
          serviceGetData={ProfileGroupServices.getInstance().getLinkGroup}
        />
      </View>
    );
  }
}
