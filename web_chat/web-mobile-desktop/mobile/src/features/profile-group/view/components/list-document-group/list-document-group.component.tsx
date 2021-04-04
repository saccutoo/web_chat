import { processRequestTrustRespository } from 'core/common/networking/api-helper';
import { GetAttachmentGroupRes } from 'core/common/types/base-response';
import ProfileGroupServices from 'core/model-profile-group/profile-group.services';
import { InfinityScrollComponent } from 'libraries/infinity-scroll/infinity-scroll.component';
import * as React from 'react';
import { FlatList, View } from 'react-native';
import { ItemDocumentGroupComponent } from './item-document-group/item-document-group.component';
import { ListDocumentGroupProps } from './list-document-group.props';

interface State {
  listDocument: GetAttachmentGroupRes[];
  //   listDocument: any;
}

export class ListDocumentGroupComponent extends React.PureComponent<ListDocumentGroupProps, State> {
  constructor(props: ListDocumentGroupProps) {
    super(props);

    this.state = {
      listDocument: [],
    };
  }
  // componentDidMount() {
  //   this.getDocumentConversation();
  // }

  // // get attachment of conversation
  // getDocumentConversation = () => {
  //   processRequestTrustRespository(
  //     ProfileGroupServices.getInstance().getAttachmentGroup({
  //       chatRoomId: this.props.chatRoomId,
  //       typeAttachment: 3,
  //       pageParams: { page: 1, pageSize: 15 },
  //     }),
  //     this.getDocumentConversationSuccess
  //   );
  // };

  // getDocumentConversationSuccess = (res: any) => {
  //   console.log('GET Document OF CONVERSATION :', res);
  //   this.setState({ listDocument: res?.data });
  // };

  renderItem = (item: GetAttachmentGroupRes) => {
    return <ItemDocumentGroupComponent item={item} />;
  };

  param = { chatRoomId: this.props.chatRoomId, typeAttachment: 8 };

  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* <FlatList
          data={this.state.listDocument}
          renderItem={({ item }) => <ItemDocumentGroupComponent item={item} />}
          ListFooterComponent={() => <View style={{ height: 40, width: '100%' }} />}
        /> */}
        <InfinityScrollComponent
          renderItem={this.renderItem}
          param={this.param}
          serviceGetData={ProfileGroupServices.getInstance().getAttachmentGroup}
        />
      </View>
    );
  }
}
