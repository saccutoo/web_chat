import { APP_CONFIGS } from 'core/common/app-config';
import { processRequestTrustRespository } from 'core/common/networking/api-helper';
import { GetAttachmentGroupRes } from 'core/common/types/base-response';
import ProfileGroupAdapter from 'core/model-profile-group/profile-group.adapter';
import ProfileGroupServices from 'core/model-profile-group/profile-group.services';
import { InfinityScrollComponent } from 'libraries/infinity-scroll/infinity-scroll.component';
import * as React from 'react';
import { Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { ListImageGroupAdapter } from './list-image-group.adapter';
import { ListImageGroupProps } from './list-image-group.props';

interface State {
  listImage: GetAttachmentGroupRes[];
}

export class ListImageGroupComponent extends React.PureComponent<ListImageGroupProps, State> {
  constructor(props: ListImageGroupProps) {
    super(props);

    this.state = {
      listImage: [],
    };
  }

  // componentDidMount() {
  //   this.getImageConversation();
  // }

  // // get attachment of conversation
  // getImageConversation = () => {
  //   processRequestTrustRespository(
  //     ProfileGroupServices.getInstance().getAttachmentGroup({
  //       chatRoomId: this.props.roomId,
  //       typeAttachment: 1,
  //       pageParams: { page: 1, pageSize: 15 },
  //     }),
  //     this.getImageConversationSuccess
  //   );
  // };

  // getImageConversationSuccess = (res: any) => {
  //   console.log('GET IMAGE OF CONVERSATION :', res);
  //   this.setState({ listImage: res?.data });
  // };

  // render item
  renderImage = (item: GetAttachmentGroupRes) => {
    console.log('URI : ', APP_CONFIGS.SERVER_FILE + item.guiId);
    return (
      <View>
        {item.guiId != undefined ? (
          <TouchableOpacity onPress={() => this.props.goToPhotoDetail(item.guiId)}>
            <Image
              source={{ uri: APP_CONFIGS.SERVER_FILE + item.guiId }}
              style={{
                height: (Dimensions.get('window').width - 56) / 3,
                width: (Dimensions.get('window').width - 56) / 3,
                margin: 3,
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  param = { chatRoomId: this.props.roomId, typeAttachment: 1 };

  render() {
    console.log('LIST IMAGE :', this.state.listImage);

    // if (this.state.listImage.length != 0) {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* <FlatList
          numColumns={3}
          data={this.state.listImage}
          renderItem={({ item }) => this.renderImage(item)}
          ListFooterComponent={() => <View style={{ height: 40, width: '100%' }} />}
        /> */}
        <InfinityScrollComponent
          renderItem={this.renderImage}
          param={this.param}
          serviceGetData={ProfileGroupServices.getInstance().getAttachmentGroup}
          numberColumn={3}
        />
      </View>
    );
    // } else {
    //   return null;
    // }
  }
}
