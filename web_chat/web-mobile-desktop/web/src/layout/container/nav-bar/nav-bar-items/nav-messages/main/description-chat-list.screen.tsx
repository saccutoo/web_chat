import React from 'react';
import DescriptionChatScreen from '../description-chat/description-chat.screen';
import HeaderDescriptionChatListScreen from '../header/header-description-chat-list.screen';
import './description-chat-list.scss';
import DescriptionChatListAdapter from './description-chat-list.adapter';
import { IDescriptionChat } from '../description-chat/description-chat.props';
import { ENUM_KIND_OF_ICONPANEL } from '../../../../../../libraries/Enum/icon-panel';
import CustomInputScreen from '../../../../../../libraries/Features/custom-input/custom-input.screen';
import InfiniteScrollFieldScreen from '../../../../../../libraries/Features/infinity-scroll-field/infinity-scroll-field.screen';
import { SrcSearchLoupe } from '../../../../../../libraries/Icons/icon-src';
import SearchFieldScreen from '../../../../../../features/nav-detail/search-field/search-field.screen';


const styleCustomInput = {
  backgroundImage: `url('${SrcSearchLoupe}')`,
  backgroundPosition: "3% 50%",
  padding: "12px 20px 12px 40px",
  borderRadius: "8px",
  fontSize: "1rem",
};

const iconpanel = ENUM_KIND_OF_ICONPANEL.MESSAGES;

function DescriptionChatListScreen() {
  const {
    onChange,
    activedDescriptionChat,
    descriptionChatList,
    totalPages,
    hasSearch, setHasSearch,
    query, setQuery,
    searchDescriptionChatList,
    page, setPage,
    isUpdating,
    redirectToChatDetail
  } = DescriptionChatListAdapter()

  const length = descriptionChatList.length;

  const showDescriptionChatList = (descriptionChatList: IDescriptionChat[], activedDescriptionChat: any) => {
    if (descriptionChatList) {
      return descriptionChatList.map(
        (descriptionChat: IDescriptionChat, idx: number) => (
          <DescriptionChatScreen
            key={idx}
            descriptionChat={descriptionChat}
            activedDescriptionChat={activedDescriptionChat}
            onClick={() => { redirectToChatDetail(descriptionChat.id, descriptionChat) }}
          ></DescriptionChatScreen>
        )
      );
    }
    return <></>
  };

  // const showSearchChatList = (searchDescriptionChatList: ISearchChatRoom[]) => {
  //   if (searchDescriptionChatList) {
  //     return searchDescriptionChatList.map(
  //       (searchChat: ISearchChatRoom, idx: number) => (
  //         <div className="item-search" key={idx}>
  //           <CircleAvatarScreen
  //             class="img-48"
  //             src={getApiUrl(searchChat._source.avatar)}
  //             isOnline={false}
  //             hasCursor
  //             firstCharacter={searchChat._source.title ?
  //               searchChat._source.title.charAt(0).toUpperCase()
  //               : searchChat._source.userName.charAt(0).toUpperCase()
  //             }
  //           />
  //           <div className="search-name">{searchChat._source.title ?
  //             searchChat._source.title
  //             : searchChat._source.userName}</div>
  //         </div>
  //       )
  //     );
  //   }
  //   return <></>
  // };

  return (
    <>
      <div className="descriptionchatlist-top">
        <HeaderDescriptionChatListScreen></HeaderDescriptionChatListScreen>

        <CustomInputScreen
          style={styleCustomInput}
          class="searchinput-container step5"
          placeHolder="Tìm kiếm cuộc trò chuyện"
          isMultiline={false}
          isTextArea={false}
          onChange={onChange}
          onClick={() => {
            setHasSearch(true)
          }}
          hasClearText={true}
          value={query}
          setValue={setQuery}
          id="descriptionchatlist-input-index"
        ></CustomInputScreen>

      </div>

      {
        hasSearch && <SearchFieldScreen
          searchDescriptionChatList={searchDescriptionChatList} 
          customClass={""}
          />
      }

      <InfiniteScrollFieldScreen
        child={showDescriptionChatList(descriptionChatList, activedDescriptionChat)}
        iconpanel={iconpanel}
        length={length}
        totalPages={totalPages}
        className={"descriptionchatlist-bottom"}
        isUpdating={isUpdating}
        page={page}
        setPage={setPage}
      ></InfiniteScrollFieldScreen>

    </>
  );
}

export default DescriptionChatListScreen;


