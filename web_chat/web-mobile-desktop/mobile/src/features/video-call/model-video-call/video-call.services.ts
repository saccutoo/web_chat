/* 
    Created by longdq
*/


export default class VideoCallServices {
  private static instance: VideoCallServices;

  static getInstance(): VideoCallServices {
    if (!VideoCallServices.instance) {
      VideoCallServices.instance = new VideoCallServices();
    }
    return VideoCallServices.instance;
  }
}
