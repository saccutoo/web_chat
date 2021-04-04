import ChatDetailServices from 'core/model-chat-detail/chat-detail.services';
import { HyperUtils } from 'core/common/hyper-utils';
import { processRequestRespository } from 'core/common/networking/api-helper';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
/* 
    Created by longdq
*/
import { InputToolBarComponent } from './input-tool-bar.component';
import { IAttachment, KindOfMsg } from 'core/common/types/message';

export class InputToolBarAdapter {
  private InputToolBarComponent: InputToolBarComponent;

  constructor(Component: InputToolBarComponent) {
    this.InputToolBarComponent = Component;
    console.log('InputToolBar : ', Component);
  }

  onChooseFile = async () => {
    console.log('test_choose_file');
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.audio,
          DocumentPicker.types.csv,
          DocumentPicker.types.zip,
          DocumentPicker.types.pdf,
          DocumentPicker.types.plainText,
          DocumentPicker.types.images,
        ],
      });
      console.log('PIC FILE: ', res);
      this.uploadFile([res]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('test_send_file_cancel: ' + err);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log('test_send_file_ex: ' + err);
        throw err;
      }
    }
  };

  onChooseImage = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    }).then((photos) => {
      console.log(photos, 'photos ==============');
      if (HyperUtils.isNotEmpty(photos)) {
        // for (let i = 0; i < photos.length; i++) {
        //   this.uploadFile(photos[i]);
        // }
        this.uploadFile(photos);
      }
    });
  };

  uploadFile = (files: any) => {
    const { roomId, userId } = this.InputToolBarComponent.props;
    let formData = new FormData();
    // formData.append('chatId', roomId);
    // formData.append('fileId', HyperUtils.genRandomID(16));
    // formData.append('files', files);
    console.log('RoomId :', roomId);
    const Files = files[0];

    for (let i = 0; i < Files.length; i++) {
      // formData.append('files', {
      //   uri: files[i].path === undefined ? files[i].uri : files[i].path,
      //   type: files[i].mime === undefined ? files[i].type : files[i].mime,
      //   name: files[i].uri || 'hyperlogy',
      // });
      // minhnn
      console.log('File I :', Files[i]);

      formData.append('fileContent', Files[i]);
    }

    // if (replyData && replyData.itemMessage && replyData.itemMessage._id) {
    // formData.append('replyId', replyData.itemMessage._id);
    // }
    console.log('test_form_data: ', formData);
    // processRequestRespository(ChatDetailServices.getInstance().uploadFile(formData));
    const res = ChatDetailServices.getInstance()
      .uploadFile(formData)
      .then((res) => {
        console.log('Upload File Res: ', res.data);
        const pathFileList = res.data;
        let attachments: IAttachment[] = [];
        for (let index = 0; index < pathFileList.length; index++) {
          attachments.push({
            contentType: '1',
            name: pathFileList[index].guid,
            type: '1',
            guiId: pathFileList[index].guid,
          });

          console.log('Attachments :', attachments);

          var messageSend: any;
          // messageSend.messageType = KindOfMsg.ATTACHMENT;
          // messageSend.attachments = attachments;

          messageSend = {
            messageType: KindOfMsg.ATTACHMENT,
            attachments: attachments,
            chatRoomId: roomId,
            message: 'đã gửi ảnh',
            messageStatus: '1',
            // messageType: '1',
            // user: { userName: 'Test 1', status: '1' },
            userId: userId,
          };
        }
        console.log('UPLOAD FILE PARAMS : ', messageSend);
        processRequestRespository(
          ChatDetailServices.getInstance().insertMessage(messageSend),
          () => sendMessageSuccess(''),
          undefined,
          false,
          false
        );
      });
  };
}
function sendMessageSuccess(arg0: string): void {
  throw new Error('Function not implemented.');
}
