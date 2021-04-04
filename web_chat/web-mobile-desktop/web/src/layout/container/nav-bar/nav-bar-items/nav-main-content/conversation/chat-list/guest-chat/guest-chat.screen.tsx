import React, { useEffect, useRef } from 'react';
import CircleAvatarScreen from '../../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import MainPopupScreen from '../../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import DetailPopupScreen from '../../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import './guest-chat.scss';
import GuestChatAdapter from './guest-chat.adapter';
import { IGuestChat } from './guest-chat.props';
import { Picker } from 'emoji-mart'
import { IconMoreVertical, IconShareArrowLeftLine, IconShareArrowLeftSolid, IconSlidesSquare, IconSmileCircle } from '../../../../../../../../libraries/Icons/icon.screen';
import useOutsideClick from '../../../../../../../../libraries/Hooks/useOutsideClick';
import { ENUM_KIND_OF_SHAPE_OF_MESSAGE } from '../../../../../../../../libraries/Enum/shape_of_message';
import getApiUrl from '../../../../../../../../libraries/Functions/get-api-url';
import { ENUM_KIND_OF_MESSAGE } from '../../../../../../../../libraries/Enum/message';
import moment from 'moment';
import { getDayByTime } from '../../../../../../../../libraries/Functions/get-time-period-between-times';


function GuestChatScreen(props: IGuestChat) {
    const ref: any = useRef<HTMLInputElement | null>(null)

    const {
        isVisibleReaction, setVisibleReaction
    } = GuestChatAdapter(props)

    useOutsideClick(ref, () => {
        setVisibleReaction(false);
    });

    const { children, shape, respondedMess , time } = props;

    const {
        redirectToDetailUser,
        setResponMess,
        copyText,
        addReaction,
        type,
        user
    } = GuestChatAdapter(props);


    const listEles = (type === ENUM_KIND_OF_MESSAGE.TEXT || type === ENUM_KIND_OF_MESSAGE.LINK) ? 
    [
        {
            onClick: setResponMess,
            icon: <IconShareArrowLeftLine></IconShareArrowLeftLine>,
            text: "Trả lời"
        },
        {
            onClick: copyText,
            icon: <IconSlidesSquare></IconSlidesSquare>,
            text: "Sao chép"
        }
    ] : [
        {
            onClick: setResponMess,
            icon: <IconShareArrowLeftLine></IconShareArrowLeftLine>,
            text: "Trả lời"
        }
    ]

    const eleDetailPopup = (onClosePopup: any) => (<DetailPopupScreen
        listEles={listEles}
        onClosePopup={onClosePopup}
    ></DetailPopupScreen>);

    const customReactionEmojis: any = [
        {
            name: '+1',
            short_names: ['+1'],
            text: '',
            emoticons: [],
            keywords: ['thumbsup'],
        },
        {
            name: 'thumbsdown',
            short_names: ['thumbsdown'],
            text: '',
            emoticons: [],
            keywords: ['thumbsdown'],
        },
        {
            name: 'grinning',
            short_names: ['grinning'],
            text: '',
            emoticons: [],
            keywords: ['grinning'],
        },
        {
            name: 'heart',
            short_names: ['heart'],
            text: '',
            emoticons: [],
            keywords: ['laughing', 'satisfied'],
        },
        {
            name: 'sweat_smile',
            short_names: ['sweat_smile'],
            text: '',
            emoticons: [],
            keywords: ['sweat_smile'],
        },
        {
            name: 'cry',
            short_names: ['cry'],
            text: '',
            emoticons: [],
            keywords: ['cry'],
        },
        {
            name: 'rage',
            short_names: ['rage'],
            text: '',
            emoticons: [],
            keywords: ['rage'],
        },
    ]

    const reactionDetailPopup = (onClosePopup: any) => (
        <Picker
            onSelect={addReaction}
            // style={{display: isVisibleEmojiPicker ? 'block' : 'none'}} 
            showPreview={false}
            showSkinTones={false}
            set={'facebook'}
            include={['custom']}
            custom={customReactionEmojis}
            emojiSize={32}
            emojiTooltip={true}
        />
    );

    const timeBlock = (
        <div className="textcontext-guest-time">
            {respondedMess && <IconShareArrowLeftSolid></IconShareArrowLeftSolid>}
            <div className="subtitle-regular">
                {user.userName}
            </div>
            <div className="dot-ellipse"></div>
            <div className="textcontext-time subtitle-regular-2 ">
                {moment(time).format("HH:mm")} {getDayByTime(new Date(time))}
            </div>
        </div> 
    )

    return (
        <div ref={ref} className="guestchat-container">
            {
                shape === ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP || respondedMess ? <CircleAvatarScreen
                    src={getApiUrl(user.avatar)}
                    class="guestchat-left img-32"
                    isOnline={false}
                    onClick={redirectToDetailUser}
                    hasCursor={ true }
                ></CircleAvatarScreen> : <div style={{ width: "32px" }}></div>
            }

            <div className="guestchat-right">
                {/* <span className="subtitle-regular margin-left-12">
                    {user.userName}
                </span> */}
                { (props.shape === 0 || respondedMess) ? timeBlock : "" }
                <div className="guestchat-maincontext">

                    {children}

                    <MainPopupScreen

                        context={reactionDetailPopup}
                        offsetY={-100} offsetX={-20}
                        customStyle={'background-neutral-midnight padding-4'}
                    >
                        <div className="guestchat-icon cursor-pointer flex-center img-24"
                            style={{ opacity: isVisibleReaction ? 1 : 0 }}>
                            <IconSmileCircle className="icon-svg--hover" onClick={() => setVisibleReaction(true)} />
                        </div>
                    </MainPopupScreen>

                    <MainPopupScreen context={eleDetailPopup}>
                        <div className="guestchat-icon cursor-pointer flex-center img-24">
                            {/* <div className="vertical3dots"></div> */}
                            <IconMoreVertical className="icon-svg--hover"></IconMoreVertical>
                        </div>
                    </MainPopupScreen>

                </div>
            </div>
        </div>
    )
}

export default GuestChatScreen;
