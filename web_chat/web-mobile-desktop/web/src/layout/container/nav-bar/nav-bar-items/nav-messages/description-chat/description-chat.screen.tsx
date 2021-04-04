import React from "react";
import CircleAvatarScreen from "../../../../../../libraries/Features/circle-avtar/circle-avatar.screen";
import CustomBadgeScreen from "../../../../../../libraries/Features/custom-badge/custom-badge.screen";
import DescriptionChatAdapter from "./description-chat.adapter";
import { IDescriptionChatComp } from "./description-chat.props";
import "./description-chat.scss";

function DescriptionChatScreen(props: IDescriptionChatComp) {
  const {
    isGroup,
    hasRead,
    hasActived,
    isOnline,
    createdAt,
    lastMessage,
    onClick,
    nameConversation,
    srcImage,
  }  = DescriptionChatAdapter(props)


  return (
    <div
      className={ "descriptionchat-container cursor-pointer " + ( hasActived ? "descriptionchat-container--active" : "" ) }
      onClick={onClick}
    >
      <div className={"descriptionchat-image "}>
        <CircleAvatarScreen
          class="img-48"
          src={ srcImage }
          isOnline={ isOnline }
          hasCursor
          title={ nameConversation }
        />
      </div>
      <div className={"descriptionchat-context " + ( hasRead ? " " : "unread" )}>
        <div className="descriptionchat-context-top">
          <span className={ ( hasRead ? "descriptionchat-username" : "descriptionchat-username-unread" ) }>
            {
              nameConversation
            }
          </span>
          {
            isGroup && (
              <CustomBadgeScreen
                text="Nhóm"
                class="margin-left-4"
              ></CustomBadgeScreen>
            )
          }
          <span className="descriptionchat-timeoflastmess body-reglar-hinted">
            {
              createdAt 
            }
          </span>
        </div>
        <div className={ "descriptionchat-context-bottom " + ( hasRead ? "" : "unread" ) } >
          <p className={ "text-overflow-ellipsis width-200 " + ( hasRead ? "body-reglar-hinted " : "body-bold" ) }>
            {
              lastMessage ? lastMessage : ""
            }
          </p>
        </div>      
      </div>
    </div>
  );
}

export default DescriptionChatScreen;
