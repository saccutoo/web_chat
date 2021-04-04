import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { IconChatMessage2Line } from '../../libraries/Icons/icon.screen';
import IhcmBoxChatIframe from './box-chat/ihcm-box-chat.screen';
import IhcmListGroupIframe from './list-group/ihcm-list-group.screen';
import IhcmNotificationIframe from './notification/ihcm-nofitication.screen';
import IhcmVideoCallIframe from './video-call/ihcm-video-call.screen';

function IhcmIframe(props: any) {

  return (
    <>
      <Router>
        <Switch>
          <Route path="/iframe/ihcm-notification">
            <IhcmNotificationIframe></IhcmNotificationIframe>
          </Route>

          <Route path="/iframe/ihcm-group-list">
            <IhcmListGroupIframe></IhcmListGroupIframe>
          </Route>

          <Route path="/iframe/ihcm-box-chat" >
            <IhcmBoxChatIframe></IhcmBoxChatIframe>
          </Route>

          <Route path="/iframe/ihcm-videocall" >
            <IhcmVideoCallIframe></IhcmVideoCallIframe> 
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default IhcmIframe;
