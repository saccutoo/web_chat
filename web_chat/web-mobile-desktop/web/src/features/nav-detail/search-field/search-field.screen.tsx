/* 
    Created by huydz
*/

import React from "react";
import { ISearchChatRoom } from "../../../layout/container/nav-bar/nav-bar-items/nav-messages/description-chat/description-chat.props";
import CircleAvatarScreen from "../../../libraries/Features/circle-avtar/circle-avatar.screen";
import getApiUrl from "../../../libraries/Functions/get-api-url";
import SearchFieldAdapter from "./search-field.adapter";
// import SearchFieldAdapter from "./search-field.adapter";
import { SearchFieldProps } from "./search-field.props";
import './search-field.scss';

const SearchFieldScreen = (props: SearchFieldProps) => {
  const { createChatRoom } = SearchFieldAdapter(props);
  return (
    <div className={'searchfield-container ' + props.customClass} id="searchfield-container-index">
      {
        props.searchDescriptionChatList.map(
          (searchChat: ISearchChatRoom, idx: number) => (
            <div className="item-search"
              key={idx}
              onClick={() => createChatRoom(searchChat._source)}
            >
              <CircleAvatarScreen
                class="img-48"
                src={getApiUrl(searchChat._source.avatar)}
                isOnline={false}
                hasCursor
                title={searchChat._source.title ?
                  searchChat._source.title
                  : searchChat._source.userName
                }
              />
              <div className="search-name">{searchChat._source.title ?
                searchChat._source.title
                : searchChat._source.userName}</div>
            </div>
          )
        )
      }
    </div>
  );
}

export default SearchFieldScreen;



