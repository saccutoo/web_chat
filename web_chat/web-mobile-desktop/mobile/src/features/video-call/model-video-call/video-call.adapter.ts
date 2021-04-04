import IncomingCallServices from 'core/model-incoming-call/incoming-call.services';
import { processRequestRespository } from 'core/common/networking/api-helper';
import { KindOfMsg } from 'core/common/types/message';
import VideoCallContainer from '../view/video-call.screen';
import NavigationService from 'routers/navigation-service';
import { showAlert, TYPE } from 'libraries/dropdown-alert';

export class VideoCallAdapter {
  VideoCallContainer: VideoCallContainer;
  constructor(container: VideoCallContainer) {
    this.VideoCallContainer = container;
  }

  onFinishCall = () => {
    const { userInfo } = this.VideoCallContainer.props;
    showAlert(TYPE.WARN, 'Finish call_1:', userInfo.user.id);
    const chatId = this.VideoCallContainer.chatInfo?.chatId || this.VideoCallContainer.chatInfo?.id;
    const params: StatusVideoCallParams = {
      chatId: chatId,
      type: KindOfMsg.TYPE_VIDEO_CALL_FINISH,
      senderId: userInfo.user.id,
      receiverId: this.VideoCallContainer.chatInfo?.senderId || this.VideoCallContainer.chatInfo?.id,
      // timeStart: this.VideoCallContainer.timeStart,
    };

    console.log(
      'test_onFinishCall_terminate_params: ',
      params,
      ', prop: ',
      this.VideoCallContainer.chatInfo
    );

    processRequestRespository(
      IncomingCallServices.getInstance().updateStatusVideoCall(params),
      () => {
        console.log('test_onFinishCall_terminate_sucess');
        // NavigationService.pop();
      },
      undefined,
      false,
      false
    );
  };
}
