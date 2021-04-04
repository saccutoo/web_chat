import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import CreateGroupScreen from '../group/create/main/create-group.screen';

import ConversationScreen from '../conversation/main/conversation.screen';
import './content.scss';
import GroupDetailScreen from '../group/detail/group-detail.screen';
import CreatePersonalScreen from '../personal/create/create-personal.screen';
import { ENUM_KIND_OF_NOTFOUNDICON } from '../../../../../../libraries/Enum/not-found-icon';
import DataNotFoundScreen from '../../../../../../libraries/Features/data-not-found/data-not-found.screen';
import PersonalInforScreen from '../personal/infor/personal-infor.screen';

function ContentScreen() {
  return (
    <div className="content-container step6">
      <Switch>
        <Route path="/" exact>
          <DataNotFoundScreen text={"Vui lòng chọn một tin nhắn"} icon={ENUM_KIND_OF_NOTFOUNDICON.CHAT} isPosition={true}></DataNotFoundScreen>
        </Route>
        <Route path="/g/create">
          <CreateGroupScreen></CreateGroupScreen>
        </Route>
        <Route path="/p/create">
          <CreatePersonalScreen></CreatePersonalScreen>
        </Route>
        <Route path="/g/:id" exact>
          <ConversationScreen></ConversationScreen>
        </Route>
        {/* <Route path="/g/detail/:id">
          <GroupDetailScreen></GroupDetailScreen>
        </Route> */}
        <Route path="/p/:id">
          <PersonalInforScreen></PersonalInforScreen>
        </Route>
      </Switch>
    </div>
  );
}

export default ContentScreen;
