import { post } from "../../helpers/api/api-helper";
import { URL_PATHS } from "../../helpers/networking/url-paths";
import { IChat } from "../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/main/conversation.props";

const videoCallService = () => {
  const sendMessageVideo = async (message: IChat) => {
    return await post(
      URL_PATHS.POST_CREATE_MESSGAE_STATUS_VIDEO_CALL,
      message,
      true
    );
  };
  return {
    sendMessageVideo,
  };
};

export default videoCallService;
