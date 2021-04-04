
import { StatusVideoCallParams } from "features/video-call/model-video-call/video-call.props";
/* 
    Created by longdq
*/

import { fetch, post, put, deletes } from "core/common/networking/api-helper"
import { URL_PATHS } from "core/common/networking/url-paths";

export default class IncomingCallServices {
  private static instance: IncomingCallServices;

  static getInstance(): IncomingCallServices {
    if (!IncomingCallServices.instance) {
      IncomingCallServices.instance = new IncomingCallServices();
    }
    return IncomingCallServices.instance;
  }

   // Video Call
   updateStatusVideoCall = (data: StatusVideoCallParams) => {
    return post(URL_PATHS.UPDATE_STATUS_VIDEO_CALL, data, true);
  };
}


