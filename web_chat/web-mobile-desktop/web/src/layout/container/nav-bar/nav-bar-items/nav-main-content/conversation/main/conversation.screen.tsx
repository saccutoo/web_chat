import React from 'react';
import HeaderConversationScreen from '../header/header-conversation.screen'
import ChatListScreen from '../chat-list/main/chat-list.screen';
import ChatInputScreen from '../chat-input/main/chat-input.screen';
import SearchChatScreen from '../chat-list/search-chat/search-chat.screen';
import ConversationAdapter from './conversation.adapter';
import { ENUM_KIND_OF_STATUS } from '../../../../../../../libraries/Enum/status';
import PersonalConversationScreen from '../../personal/conversation/personal-conversation.screen';
import GroupDetailScreen from '../../group/detail/group-detail.screen';
import LoadingSpinnerScreen from '../../../../../../../libraries/Features/loading-spinner/loading-spinner.screen';
import PersonalDetailScreen from '../../personal/detail/personal-detail.screen';
import { ENUM_KIND_OF_CHATROOM } from '../../../../../../../libraries/Enum/chat-room';
import HeaderConversationInBoxChatScreen from '../header/header-conversation-in-box-chat.screen';
import GroupConversationScreen from '../../group/conversation/group-conversation.screen';
import './conversation.scss';

function ConversationScreen(props: any) {
    const { isBoxChat , onClickToClose , onClickToFullScreen, roomIdBoxChat } = props;

    const {
        query, setQuery,
        hasSearch,
        onSearch,
        count,
        page, setPage,
        isUpdating,
        listMessage, setListMessage,
        hasUploadFiles, setHasUploadFiles,
        respondedMess, setRespondedMess,
        roomId,
        editedMess, setEditedMess,
        groupHeader,
        memberInGroup,
        onChangeDisplay,
        detailIsDisplayed,
        miniImageList,
        indexRecord , setIndexRecord,
        isScrollBottom , setIsScrollBottom,
        isFirstLoad , setIsFirstLoad
    } = ConversationAdapter(props);

    let eleOptionHeader = null;

    if(isBoxChat){
        eleOptionHeader =  <HeaderConversationInBoxChatScreen roomIdBoxChat={roomIdBoxChat} onClickToClose={onClickToClose} onClickToFullScreen={onClickToFullScreen}></HeaderConversationInBoxChatScreen>
        
        // HeaderConversationInBoxChatScreen({
        //     roomIdBoxChat , onClickToClose , onClickToFullScreen
        // })
    } else{
        if (groupHeader.type === ENUM_KIND_OF_CHATROOM.GROUP) {
            eleOptionHeader = <GroupConversationScreen onClickIntroduce={onChangeDisplay} onSearch={ onSearch }></GroupConversationScreen>
        } else {
            eleOptionHeader = <PersonalConversationScreen onClickIntroduce={onChangeDisplay} onSearch={ onSearch }></PersonalConversationScreen>
        }
    }

    // if (isUpdating && page === 1) {
    //     return (
    //         <div className="conversation-container flex-center">
    //             <div className="chatlist-loader">
    //                 <LoadingSpinnerScreen class="loader-big"></LoadingSpinnerScreen>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className={"conversation-container " + ( isBoxChat ? "conversation-container-inboxchat" : "" )}>

            <HeaderConversationScreen
                title={groupHeader?.title}
                avatar={groupHeader?.avatar}
                isOnline={groupHeader?.isOnline}
                eleOptionHeader={eleOptionHeader}
                hasSearch={hasSearch}
                onSearch={onSearch}
                setQuery={setQuery}
                onClickAvatar={onChangeDisplay}
                roomIdBoxChat={roomIdBoxChat}
            ></HeaderConversationScreen>

            {
                hasSearch && (
                    <SearchChatScreen
                        query={query}
                        setMessageInChatList={setListMessage}
                        setPageInChatList={setPage}
                        setIndexRecord={setIndexRecord}
                        onSearch={onSearch}
                        memberInGroup={ memberInGroup }
                    ></SearchChatScreen>
                )
            }

            <ChatListScreen
                roomId={roomId}
                indexRecord={ indexRecord }
                listMessage={listMessage}
                setListMessage={setListMessage}
                hasSearch={hasSearch}
                count={count}
                page={page}
                setPage={setPage}
                isUpdating={isUpdating}
                setRespondedMess={setRespondedMess}
                setEditedMess={setEditedMess}
                memberInGroup={memberInGroup}
                isScrollBottom={ isScrollBottom }
                setIsScrollBottom={ setIsScrollBottom }
                isFirstLoad={ isFirstLoad }
                setIsFirstLoad={ setIsFirstLoad }
            ></ChatListScreen>
            
            <ChatInputScreen 
                setListMessage={ setListMessage } 
                roomId={ roomId }
                hasUploadFiles= { hasUploadFiles }
                setHasUploadFiles= { setHasUploadFiles }
                respondedMess={ respondedMess }
                setRespondedMess={ setRespondedMess }
                editedMess={ editedMess }
                setEditedMess={ setEditedMess }
                isScrollBottom={ isScrollBottom }
                setIsScrollBottom={ setIsScrollBottom }
            ></ChatInputScreen>

            {
                detailIsDisplayed && (
                    (groupHeader && groupHeader.type === ENUM_KIND_OF_CHATROOM.GROUP) ? (
                        <GroupDetailScreen
                            ConversationDetail={groupHeader}
                            onChangeDisplay={onChangeDisplay}
                            miniImageList={miniImageList}
                        ></GroupDetailScreen>
                    ) : (
                                <PersonalDetailScreen
                                onChangeDisplay={onChangeDisplay}
                            ></PersonalDetailScreen>
                    )
                )
            }

        </div>
    )
}

export default ConversationScreen;