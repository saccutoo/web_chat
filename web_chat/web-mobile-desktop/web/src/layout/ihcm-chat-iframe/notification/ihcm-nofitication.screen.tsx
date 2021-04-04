import React from 'react';
import { IconChatMessage2Line } from '../../../libraries/Icons/icon.screen';
import IhcmNotifiationAdapater from './ihcm-notification.adapter';

function IhcmNotificationIframe(props: any) {

  const {
    toggleListGroup
  } = IhcmNotifiationAdapater();

  return (
    <IconChatMessage2Line className="cursor-pointer" onClick={toggleListGroup}></IconChatMessage2Line>
  );
}

export default IhcmNotificationIframe;
