import React from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";
import NavbarScreen from './nav-bar/main/navbar.screen';
import NavDetailScreen from '../../features/nav-detail/main/nav-detail.screen';
import BodyAdapter from './body.adapter';
import './body.scss';
import ContentScreen from './nav-bar/nav-bar-items/nav-main-content/main/content.screen';
import ToastifyScreen from '../../libraries/Features/toastify/toastify.screen';
import GetidModalScreen from '../../features/getid-modal/getid-modal.screen';
import GuidedTourScreen from '../../features/guided-tour/guided-tour.screen';
import VideoCallsScreen from '../../features/video-calls/video-calls.screen';
import LossNetworkModalScreen from '../../features/loss-network-modal/loss-network-modal.screen';
import Sound from '../../libraries/Features/video-call/audio.screen'

function BodyScreen(props : any) {
  const {
    activedIcon , setActivedIcon,
    styleInlineBody,
    styleInlineBodyRight
  } = BodyAdapter();

  return (
    <>
      <Router>
        <div className="body-container" style = { styleInlineBody }>
          <div className="body-left">
            <NavbarScreen activedIcon={ activedIcon } setActivedIcon={ setActivedIcon }></NavbarScreen>
          </div>
          <div className="body-right" style = { styleInlineBodyRight }>
            <NavDetailScreen  activedIcon={ activedIcon }></NavDetailScreen>
            <ContentScreen></ContentScreen>
          </div>
        </div>
      </Router>

      <ToastifyScreen></ToastifyScreen>

      <GetidModalScreen></GetidModalScreen> 

      <GuidedTourScreen></GuidedTourScreen>

      <VideoCallsScreen></VideoCallsScreen>
      
      <LossNetworkModalScreen></LossNetworkModalScreen>
      
      {/* <Sound></Sound> */}
    </>
  );
}


export default BodyScreen;
