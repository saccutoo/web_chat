import React from 'react';
import { ENUM_KIND_OF_ICONPANEL } from '../../../../../../../../libraries/Enum/icon-panel';
import { ENUM_KIND_OF_NOTFOUNDICON } from '../../../../../../../../libraries/Enum/not-found-icon';
import CircleAvatarScreen from '../../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import DataNotFoundScreen from '../../../../../../../../libraries/Features/data-not-found/data-not-found.screen';
import InfiniteScrollFieldScreen from '../../../../../../../../libraries/Features/infinity-scroll-field/infinity-scroll-field.screen';
import getApiUrl from '../../../../../../../../libraries/Functions/get-api-url';
import { ISearchMessage } from '../../main/conversation.props';
import SearchChatAdapter from './search-chat.adapter';
import './search-chat.scss';

function SearchChatScreen(props: any) {

  const { query , memberInGroup } = props;

  const iconpanel = ENUM_KIND_OF_ICONPANEL.NOTI;

  const {
    messageList,
    createMarkup,
    totalPages,
    isUpdating,
    page, setPage,
    handleScrollToMessage
  } = SearchChatAdapter(props);

  const length = messageList.length;

  const showAllSearchMessages = () => {
    if (length > 0) {
      const queryTemp = query.trim();
      return messageList.map((chat: ISearchMessage, index: number) => {
        const newResult = chat._source.message.replace(
          new RegExp(queryTemp, 'gi'),
          match =>
            `<mark>${match}</mark>`
        )
        if(memberInGroup && memberInGroup.length > 0 )  {
          var userTemp = memberInGroup.find((item: any) => item.user.id === chat._source.userId) || null;
        }
   
        let avatar = "";
        let userName = "";
        if(userTemp){
          const user = userTemp?.user;
          avatar = getApiUrl(user ? user.avatar : "")
          userName = user ? user.userName : ""
        }

        return (
          <div key={index} className="list-search-message-item margin-8 cursor-pointer" onClick={() => { handleScrollToMessage(chat._source.id) }}>
            <CircleAvatarScreen
              src={ avatar }
              width="40px"
              height="40px"
              class="cursor-pointer"
              isOnline={false}
            ></CircleAvatarScreen>
            <div className="list-search-message-item-name margin-left-8">
              <h4>{ userName }</h4>
              <p className="body-reglar-hinted" dangerouslySetInnerHTML={createMarkup(newResult)}></p>
            </div>
          </div>
        )
      })
    }

    return <></>
  }

  return (
    <div className="searchmessage-container">
      {
        length > 0 ? (
          <InfiniteScrollFieldScreen
            child={showAllSearchMessages()}
            iconpanel={iconpanel}
            length={length}
            totalPages={totalPages}
            className={"list-search-message-container"}
            isUpdating={isUpdating}
            page={page}
            setPage={setPage}
          ></InfiniteScrollFieldScreen>
        ) : (
            <DataNotFoundScreen
              isPosition={false}
              text="Không tìm thấy kết quả"
              icon={ENUM_KIND_OF_NOTFOUNDICON.SEARCH_MESSAGE}
            ></DataNotFoundScreen>
          )
      }
    </div>
  );
}

export default SearchChatScreen;
