import React, { useEffect, useState } from 'react';
import { IHCM_MESSAGE } from '../../../libraries/Enum/ihcm-message';
import { IconChatMessage2Line } from '../../../libraries/Icons/icon.screen';

function IhcmVideoCallAdapter() {
  const [displayVideoCall, setDisplayVideoCall] = useState<boolean>(false);

  useEffect(() => {
    if (displayVideoCall) {
      openIframeVideoCall();
    } else {
      closeIframeVideoCall();
    }
  }, [displayVideoCall])

  const openIframeVideoCall = () => {
    window.parent.postMessage(IHCM_MESSAGE.OPEN_VIDEO_CALL, "*");
  }

  const closeIframeVideoCall = () => {
    window.parent.postMessage(IHCM_MESSAGE.CLOSE_VIDEO_CALL, "*");
  }

  return {
    openIframeVideoCall, closeIframeVideoCall, setDisplayVideoCall
  };
}

export default IhcmVideoCallAdapter;
