import React, { useEffect, useReducer, useState } from "react";
import { Route, Switch } from "react-router-dom";
import {
  BrowserRouter as Router
} from "react-router-dom";
import "./App.scss";
import BodyScreen from "./layout/container/body.screen";
import HeaderScreen from "./layout/header/header.screen";
import VideoConference from "./libraries/Features/video-call/video-call.screen";
import "./libraries/Styles/base/hyper-button.scss";
import "./libraries/Styles/base/hyper-common.scss";
import "./libraries/Styles/base/hyper-input.scss";
import "./libraries/Styles/base/hyper-list.scss";
import "./libraries/Styles/utils/mixin.scss";
import "./libraries/Styles/utils/variables.scss";
import "font-awesome/css/font-awesome.min.css";
import 'emoji-mart/css/emoji-mart.css';
import IhcmIframe from "./layout/ihcm-chat-iframe/ihcm-iframe";
import AppAdapater from "./App.adapter";
import LoginScreen from "./layout/login/login.screen";

export const UserContext = React.createContext({
  id: '',
  userName: '',
  fullPathPhoto: ''
});

function App() {
  const { hasVideo, userInfo } = AppAdapater();

  if (hasVideo) {
    return (
      <>
        <VideoConference></VideoConference>
      </>
    );
  }

  return (
    <UserContext.Provider value={userInfo}>
      <Router>
        <Switch>
          <Route path="/iframe">
            <IhcmIframe></IhcmIframe>
          </Route>

          <Route path="/login">
            <LoginScreen></LoginScreen>
          </Route>

          <Route path="/">
            <HeaderScreen></HeaderScreen>

            <BodyScreen></BodyScreen>
          </Route>

        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
