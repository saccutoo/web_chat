import React, { useCallback, useMemo } from 'react';
import LoadingSpinnerScreen from '../../../../../../../../libraries/Features/loading-spinner/loading-spinner.screen';
import ImageContextChatScreen from '../context-chat/image-context-chat/image-context-chat.screen';
import TextContextChatScreen from '../context-chat/text-context-chat/text-context-chat.screen';
import CurrentChatScreen from '../current-chat/current-chat.screen';
import GuestChatScreen from '../guest-chat/guest-chat.screen';
import DatetimeContextChatScreen from '../context-chat/datetime-context-chat/datetime-context-chat.screen';
import getTimePeriodFromNow from '../../../../../../../../libraries/Functions/get-time-period-from-now';
import './chat-list.scss';
import ChatListAdapter from './chat-list.adapter';
import DataNotFoundScreen from '../../../../../../../../libraries/Features/data-not-found/data-not-found.screen';
import { ENUM_KIND_OF_NOTFOUNDICON } from '../../../../../../../../libraries/Enum/not-found-icon';
import { calBetweenTimes, getDayByTime, getDayInWeek, haveSameTimePeriod } from '../../../../../../../../libraries/Functions/get-time-period-between-times';
import { ENUM_KIND_OF_SHAPE_OF_MESSAGE } from '../../../../../../../../libraries/Enum/shape_of_message';
import { ENUM_KIND_OF_MESSAGE } from '../../../../../../../../libraries/Enum/message';
import ImageOverlayScreen from '../../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full.screen';
import GroupNotiContextChatScreen from '../context-chat/group-noti-context-chat/group-noti-context-chat.screen';
import moment from 'moment';
import { IconArrowDown } from '../../../../../../../../libraries/Icons/icon.screen';

function ChatListScreen(props: any) {

    const { 
        listMessage, setListMessage, 
        memberInGroup, 
        setChatList, 
        count, 
        page, setPage, 
        isUpdating, 
        roomId, 
        hasSearch, 
        setRespondedMess, 
        setEditedMess,
        isScrollBottom , setIsScrollBottom,
        isFirstLoad , setIsFirstLoad,   
        indexRecord
    } = props;

    const {
        userid,
        chatlistRef,
        handleScroll,
        clickFirstMessage,
        bottom,
        isOpenOverlay,
        toggleOverlay,
        mainSrcImage,
        scrollDown,
        scrollDownIsDisplayed
    } = ChatListAdapter({ 
        count, 
        page, setPage, 
        isUpdating, 
        roomId, 
        setListMessage , 
        isScrollBottom , setIsScrollBottom ,
        isFirstLoad , setIsFirstLoad,
        indexRecord
    })

    console.log(indexRecord)

    const calShape = (datetimeContext: Date,
        createAt: Date,
        index: number,
        oldCurrent: boolean,
        isCurrent: boolean,
        newCurrent: boolean,
    ) => {
        if (isCurrent !== newCurrent) {
            return ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
        }
        if (isCurrent !== oldCurrent) {
            return ENUM_KIND_OF_SHAPE_OF_MESSAGE.BOTTOM;
        }
        if (!haveSameTimePeriod(createAt, new Date(listMessage[index + 1]?.createdAt))) {
            return ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
        }
        if (!haveSameTimePeriod(createAt, new Date(listMessage[index - 1]?.createdAt))) {
            return ENUM_KIND_OF_SHAPE_OF_MESSAGE.BOTTOM;
        }

        if (haveSameTimePeriod(datetimeContext, createAt) || haveSameTimePeriod(createAt, new Date(listMessage[index + 1]?.createdAt))) {
            return ENUM_KIND_OF_SHAPE_OF_MESSAGE.CENTER;
        }
        return ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
    }

    const showMainContext = (chat: any , isCurrent: boolean , shape: number , respondedMess: any) =>{
        if(chat.messageType === ENUM_KIND_OF_MESSAGE.TEXT){
            return (
                <TextContextChatScreen
                    isCurrent={isCurrent}
                    context={chat.message}
                    datetime={getTimePeriodFromNow(chat.createdAt)}
                    shape={shape}
                    time={chat.createdAt}
                    respondedMess={respondedMess}
                    reactionList={chat.reaction}
                    memberInGroup={memberInGroup}
                    // user={chat.user}
                ></TextContextChatScreen>
            )
        }
        
        if(chat.messageType === ENUM_KIND_OF_MESSAGE.ATTACHMENT && chat?.attachments?.length > 0){
            return (
                <ImageContextChatScreen
                    isCurrent={isCurrent}
                    context={chat.attachments}
                    datetime={getTimePeriodFromNow(chat.createdAt)}
                    toggleOverlay={toggleOverlay}
                    listImage={[]}
                ></ImageContextChatScreen>
            )
        }

        if(chat.messageType === ENUM_KIND_OF_MESSAGE.LINK){
            return (
                <TextContextChatScreen
                    isCurrent={isCurrent}
                    context={chat.message}
                    datetime={getTimePeriodFromNow(chat.createdAt)}
                    shape={shape}
                    time={chat.createdAt}
                    respondedMess={respondedMess}
                    reactionList={chat.reaction}
                    memberInGroup={memberInGroup}
                    // user={chat.user}
                ></TextContextChatScreen>
            )
        }

        if (chat.messageType === ENUM_KIND_OF_MESSAGE.SYSTEM) {
            return (
                <GroupNotiContextChatScreen
                    username={chat.user.userName}
                    imgSrc={chat.user.avatar}
                    status={chat.messageStatus}
                ></GroupNotiContextChatScreen>
            )
        } 

        return (
            <></>
        )
    }

    const getEleDatetime = (datetimeContext: Date , createAt: Date) =>{
        const betweenHours = calBetweenTimes(datetimeContext, createAt);
        const betweenDay = new Date().getDate() - datetimeContext.getDate();
        // quyennq nếu 2 tin nhắn cách nhau lớn hơn 1 giờ 
        if (betweenHours > 1) {
            // quyennq Nếu là ngày hôm nay thì hiển thị time hôm nay
            if (datetimeContext.getDate() === createAt.getDate()) {

                return (<DatetimeContextChatScreen
                    text="Hôm nay"
                    day={getDayByTime(datetimeContext)}
                    datetime={moment(datetimeContext).format("HH:mm")}>
                </DatetimeContextChatScreen>);
            }
            // quyennq nếu Khoảng cách là 1 ngày thì hiển thị hôm qua
            if (betweenDay === 1) {
                return  (<DatetimeContextChatScreen
                    text="Hôm qua"
                    day={getDayByTime(datetimeContext)}
                    datetime={moment(datetimeContext).format("HH:mm")}>
                </DatetimeContextChatScreen>);
            }
            // quyennq nếu khoảng cách nằm trong từ 2 đến 7 ngày thì hiển thị thứ trong tuần
            if (betweenDay < 7 && betweenDay > 1) {
                return  (<DatetimeContextChatScreen
                    text={getDayInWeek(datetimeContext)}
                    day={getDayByTime(datetimeContext)}
                    datetime={moment(datetimeContext).format("HH:mm")}>
                </DatetimeContextChatScreen>);
            }
            // quyennq nếu khoảng cách lớn hơn 7 ngày thì hiện ngày tháng năm
            if (betweenDay >= 7) {
                return  (<DatetimeContextChatScreen
                    day={getDayByTime(datetimeContext)}
                    datetime={moment(datetimeContext).format("DD/MM/yyyy HH:mm")}>
                </DatetimeContextChatScreen>);
            }
        }

        return (
            <></>
        )
    }

    const getEleMainContext = (chat: any , eleContext: any ,isCurrent: boolean, shape : number , respondedMess: any ) =>{
        if (chat.messageType === ENUM_KIND_OF_MESSAGE.SYSTEM) {
            return eleContext;
        } 

        if (isCurrent) {
            return (
                <CurrentChatScreen
                    roomId={roomId}
                    type={chat.messageType}
                    context={chat.messageType === ENUM_KIND_OF_MESSAGE.ATTACHMENT ? chat.attachments[0]?.name : chat.message}
                    setRespondedMess={setRespondedMess}
                    messageId={chat.id}
                    userId={userid}
                    setChatList={setListMessage}
                    setEditedMess={setEditedMess}
                    attachment={ chat.attachments && chat.attachments[0] }
                >
                    {eleContext}
                </CurrentChatScreen>
            )
        }  
        return (
            <GuestChatScreen
                shape={ shape }
                roomId={ roomId }
                setRespondedMess={ setRespondedMess }
                chat={ chat } 
                setChatList={ setChatList }
                respondedMess={ respondedMess }
                time={chat.createdAt}
            >
                { eleContext }
            </GuestChatScreen>
        )
    }

    const length = listMessage.length;

    const showAllMessages = useMemo(() => {
        if (length > 0) {
            let datetimeContext = new Date(listMessage[0].createdAt);
            let oldCurrent: any = true;
            return listMessage.map((chat: any, index: number) => {
                let eleMainContext = <></>;
                let eleDatetime = <></>;

                let shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
                const isCurrent: boolean = chat.user.id === userid;
                const newCurrent: boolean = listMessage[index + 1]?.user.id === userid;
                const createAt = new Date(chat.createdAt);
                shape = calShape(datetimeContext, createAt, index, oldCurrent, isCurrent, newCurrent);
                oldCurrent = isCurrent

                eleDatetime = getEleDatetime(datetimeContext , createAt)

                datetimeContext = createAt;
                const respondedMess = chat.parent ? chat.parent : (chat.respondedMess ? chat.respondedMess : null);

                const eleContext = (
                    <div className="maincontext">
                        {
                            showMainContext(chat , isCurrent , shape , respondedMess)
                        }
                    </div>
                )

                eleMainContext = getEleMainContext( chat , eleContext , isCurrent, shape , respondedMess )

                return (
                    <div key={chat.id}>
                        { eleMainContext}
                        { eleDatetime}
                    </div>
                )
            })
        }
    } , [listMessage])

    if(isUpdating && page === 1){
        return (
            <div className="chatlist-container flex-center" >
                <LoadingSpinnerScreen class="loader-small"></LoadingSpinnerScreen>
            </div>
        )
    }

    if (length > 0) {
        return (
            <div
                className={"chatlist-container " +
                    (hasSearch ? "chatlist-container-hassearch " : "")
                }
                onScroll={handleScroll}
                ref={chatlistRef}
                style={{ bottom: `${bottom}px` }}
            >
                <div className="chatlist-main">
                    {
                        (indexRecord > 0 && page > 1) && (
                            <LoadingSpinnerScreen class="loader-small"></LoadingSpinnerScreen>
                        )
                    }
                    {
                        showAllMessages
                    }
                    {
                        page < count && <LoadingSpinnerScreen class="loader-small"></LoadingSpinnerScreen>
                    }
                </div>
                {
                    isOpenOverlay && (<ImageOverlayScreen close={toggleOverlay} mainSrcImage={mainSrcImage}></ImageOverlayScreen>)
                }
                {
                    (scrollDownIsDisplayed && !hasSearch) && (
                        <div className="chatlist-scrolldown circleavatar-container img-40 cursor-pointer" onClick={ scrollDown }>
                            <IconArrowDown></IconArrowDown>
                        </div>
                    )
                }

            </div>
        )
    }

    if(length === 0 && !isUpdating) {
        return (
            <div className="chatlist-container" >
                {
                    <DataNotFoundScreen onClick={clickFirstMessage} isPosition={false} icon={ENUM_KIND_OF_NOTFOUNDICON.MESSAGE} text="Nhấn để xin chào"></DataNotFoundScreen>
                }  
            </div>
        )
    }

    return (
        <></>
    )

}

export default ChatListScreen;
