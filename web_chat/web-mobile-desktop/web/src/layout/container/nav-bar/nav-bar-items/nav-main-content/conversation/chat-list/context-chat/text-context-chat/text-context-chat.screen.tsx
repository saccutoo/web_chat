import moment from 'moment';
import React from 'react';
import Popup from 'reactjs-popup';
import { ENUM_KIND_OF_MESSAGE } from '../../../../../../../../../libraries/Enum/message';
import { ENUM_KIND_OF_SHAPE_OF_MESSAGE } from '../../../../../../../../../libraries/Enum/shape_of_message';
import getApiUrl from '../../../../../../../../../libraries/Functions/get-api-url';
import { getDayByTime } from '../../../../../../../../../libraries/Functions/get-time-period-between-times';
import { IconShareArrowLeftSolid } from '../../../../../../../../../libraries/Icons/icon.screen';
import checkValidURL from '../../../../../../../../../libraries/Functions/check-valid-URL';
import './text-context-chat.scss';
import { getEmojiDataFromNative } from 'emoji-mart'
import { EmojiData } from 'emoji-data-ts';
import data from 'emoji-mart/data/all.json';

function TextContextChatScreen(props: any) {
    const { context, datetime, time, respondedMess, isCurrent, reactionList, memberInGroup , shape } = props;

    if (respondedMess) {
        var currentUserId = localStorage.getItem("userId");
    }

    const replaceEmoji = function (message: string) {
        var emojiRegexp = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
        if (!message)
            return;
        let newMessage: any = [];
        for (let char of message) {
            var emoji = char.match(emojiRegexp);
            if (emoji) {
                let positionEmoji = getPositionEmoji(char);
                let emoji = <span className="emoji-in-text" style={positionEmoji}></span>
                newMessage.push(emoji)
            } else {
                // let text = <span>{char}</span>;
                let text = char;
                newMessage.push(text)
            }
        }
        return newMessage
    };

    const showContext = () => {
        let rows = context.split("\n");
        if (rows.length > 1) {
            return rows.map((row: string) => {
                return <span>
                    {row}
                    <br></br>
                </span>;
            })
        }
        return <div>
            {
                (checkValidURL(context))
                    ? (
                        <a className={isCurrent ? "hyperLink" : ""} href={context} target="_blank" rel="noreferrer">{context}</a>
                    )
                    :
                    replaceEmoji(context)
            }
        </div>;
    }

    const getClassByShape = () => {
        // if (isCurrent) {
        switch (shape) {
            case ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP:
                return "";
            case ENUM_KIND_OF_SHAPE_OF_MESSAGE.CENTER:
                return "currentchat-center";
            case ENUM_KIND_OF_SHAPE_OF_MESSAGE.BOTTOM:
                return "currentchat-bottom";
            // }
        }
        return ""
    }

    let styleInline = {
        backgroundImage: `url(https://cdn.dribbble.com/users/2199928/screenshots/11532918/shot-cropped-1590177932366.png?compress=1&resize=400x300)`,
        backgroundColor: "#d7e4e2",
        minWidth: props.width,
        minHeight: props.height,
        cursor: props.hasCursor ? "pointer" : "initial"
    };

    const TooltipReactionDetail = (propsReaction: any) => (
        propsReaction.reaction ? propsReaction.reaction.userListId.map((userId: any, idx: number) => {
            // if (memberInGroup) {
            //     for (let member of memberInGroup) {
            //         if (member.userId === userId) {
            //             if (member.avatar) {
            //                 styleInline.backgroundImage = `url(${member.avatar})`
            //             }
            return (
                <Popup
                    trigger={
                        propsReaction.children
                    }
                    position={propsReaction.position ? propsReaction.position : ['top center', 'bottom center']}
                    on={['hover', 'focus']}
                    arrow={true}
                >
                    <div className="tooltip-container">
                        <ul className="detailpopup-detail detail-popup-reaction">
                            {/* <li>
                                <div
                                    className={"circleavatar-container img-24"}
                                    style={styleInline}
                                ></div>
                                <span className="color-neutral-white cursor-default">
                                    {member.user.userName}
                                </span>
                            </li> */}
                            {showListMemberReaction(propsReaction.reaction)}
                        </ul>
                    </div>
                </Popup>
            )
            //         }
            //     }
            // }
        }) : ''
    )

    const showListMemberReaction = (reaction: any) => {
        for (let userId of reaction.userListId) {
            for (let member of memberInGroup) {
                if (member.user.id === userId) {
                    if (member.user.avatar) {
                        const src = getApiUrl(member.user.avatar);
                        styleInline.backgroundImage = `url(${src})`
                    }

                    return (
                        <li>
                            <div
                                className={"circleavatar-container img-24"}
                                style={styleInline}
                            ></div>
                            <span className="color-neutral-white cursor-default">
                                {member.user.userName}
                            </span>
                        </li>
                    )
                }
            }
        }
    }

    /*
    * created by tuda
    * show Reaction on the message after parse from string to JSON in file conversation
    */
    const getPositionEmoji = (native: string) => {
        // @ts-ignore
        const emojiData = getEmojiDataFromNative(native, 'facebook', data);
        let styleEmojiPosition = {
            backgroundPosition: '53.5714% 62.5%',
        };
        if (emojiData) {
            const emoji = new EmojiData()
            const emojiConverted: any = emoji.getImageData(emojiData.id)
            styleEmojiPosition = {
                backgroundPosition: emojiConverted.x + '% ' + emojiConverted.y + '%'
            }
        }
        return styleEmojiPosition;
    }

    const showReaction = reactionList ? reactionList.map((reaction: any, idx: number) => {
        let positionEmoji = getPositionEmoji(reaction.key)
        return reaction.userListId ? (reaction.userListId.length > 0 ? (
            <TooltipReactionDetail reaction={reaction}>
                <div className={"reaction-icon"} >
                    <span className="emoji" style={positionEmoji}></span>
                    <span className="emoji-number">{reaction.userListId.length}</span>
                </div>
            </TooltipReactionDetail>
        ) : '') : ''
    }) : '';

    /*
    * created by tuda
    * show big emoji when send only one emoji
    */
    const checkOnlyEmoji = () => {
        let emojiRegexp = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
        let textMessage = context.replace(emojiRegexp, '')
        if (textMessage.length === 0) {
            let message = context.match(emojiRegexp);
            if (message) {
                if (message.length === 1) {
                    let positionEmoji = getPositionEmoji(context);
                    return (
                        <div className="wrap-emoji">
                            <span className="only-emoji" style={positionEmoji}></span>
                        </div>

                    );
                } else {
                    let newMessage: any = [];
                    for (let char of message) {
                        let positionEmoji = getPositionEmoji(char);
                        let emoji = <span className="many-emoji" style={positionEmoji}></span>
                        newMessage.push(emoji)
                    }
                    return (
                        <div className="wrap-emoji-many">
                            {newMessage}
                        </div>
                    );
                }

            }
        }
        return false;
    }

    const showRespondedMess = () => {
        const url = respondedMess.messageType === ENUM_KIND_OF_MESSAGE.ATTACHMENT ?
            (respondedMess.attachments.length > 0 ? respondedMess.attachments[0].guiId : "")
            :
            (respondedMess.message)

        return (
            <>
                {
                    isCurrent && (
                        <div className="margin-left-20 textcontext-subtitle">
                            <IconShareArrowLeftSolid></IconShareArrowLeftSolid>
                            <span className="subtitle-regular-2">
                                Bạn đã trả lời
                                {/* <span className="subtitle-bold-2"> 
                                    {
                                        (!respondedMess.user.userName || currentUserId === respondedMess.user.id) ? (
                                            " chính bạn"
                                        ) : (
                                            " " + respondedMess.user.userName
                                        )
                                    }
                                </span> */}
                            </span>

                        </div>
                    )
                }
                {
                    respondedMess.messageType === ENUM_KIND_OF_MESSAGE.ATTACHMENT ? (
                        <div className={"imagechat-container cursor-pointer "}>
                            <img src={getApiUrl(url)} className={isCurrent ? "margin-left-auto" : ""} alt="" />
                        </div>
                    ) : (
                        <div className={"textcontext-respondedmess " + (isCurrent ? "margin-left-auto" : "")}>
                            <div className="text-response">
                                {respondedMess.message}
                            </div>

                            <div className="chat-time">
                                {
                                    (!respondedMess.user.userName || currentUserId === respondedMess.user.id) ? (
                                        "Bạn"
                                    ) : (
                                        respondedMess.user.userName
                                    )
                                }
                                <div className="dot-ellipse"></div>
                                {moment(respondedMess.createdAt).format("HH:mm")} {getDayByTime(new Date(respondedMess.createdAt))}
                            </div>
                        </div>
                    )
                }
            </>
        )
    }

    const timeBlock =
        isCurrent ?
            (<div className="textcontext-time subtitle-regular-2 textcontext-current-time">

                {moment(time).format("HH:mm")} {getDayByTime(new Date(time))}
            </div>
            ) : (
                // <div className="textcontext-guest-time">
                //     {respondedMess && <IconShareArrowLeftSolid></IconShareArrowLeftSolid>}
                //     <div className="subtitle-regular margin-left-12">
                //         {user.userName}
                //     </div>
                //     <div className="dot-ellipse"></div>
                //     <div className="textcontext-time subtitle-regular-2 ">
                //         {moment(time).format("HH:mm")} {getDayByTime(new Date(time))}
                //     </div>
                // </div>
                <></>
            );

    if (context) {

        return (
            <>
                {shape === ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP || respondedMess ? timeBlock : ""}

                <div className="textcontext-container">
                    {
                        respondedMess && showRespondedMess()
                    }
                </div>
                <div className="body-regular">
                    {
                        (respondedMess && !isCurrent) && (
                            <div className="textcontext-chat-item-line"></div>
                        )
                    }
                    {
                        checkOnlyEmoji() ? checkOnlyEmoji() : (
                            <div className={"textcontext-chat-item " + (isCurrent ? "currentchat-text " : "guestchat-text ") + getClassByShape()}>
                                {
                                    showContext()
                                }
                                {/* 
                                    <span className="chat-time">
                                        {props.shape + " --- " + moment(time).format("YYYY-MM-DD HH:mm:ss")}
                                    </span> 
                                */}
                            </div>)
                    }

                    {showReaction}
                </div>
            </>
        )
    }

    return <div></div>;
}

export default TextContextChatScreen;


