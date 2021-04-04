import React from "react";
import "./company-member.scss";
import CircleAvatarScreen from "../../../../../../libraries/Features/circle-avtar/circle-avatar.screen";
import useWindowSize from "../../../../../../libraries/Hooks/useWindowSize";
import { ENUM_KIND_OF_STATUS } from "../../../../../../libraries/Enum/status";
import { ICompanyMember } from "./company-member.props";
import getApiUrl from "../../../../../../libraries/Functions/get-api-url";


function CompanyMemberScreen(props: ICompanyMember) {
  const { width } = useWindowSize();

  const renderUserImage = () => {
    let widthAva = "48px";
    let heightAva = "48px";
    if (width < 768) {
      widthAva = "40px";
      heightAva = "40px";
    }

    return (

      <CircleAvatarScreen
        class="img-48"
        width={widthAva}
        height={heightAva}
        src={ getApiUrl(props.avatar) }
        isOnline={props.status === ENUM_KIND_OF_STATUS.ACTIVE}
        hasCursor
      />
    );
  };

  return (
    <div
      className={"descriptionchat-container cursor-pointer"}
      onClick={props.onClick}
    >
      <div className="descriptionchat-image">
        {
          renderUserImage()
        }
      </div>
      <div className="descriptionchat-context">
        <div className="descriptionchat-context-top">
          <span
            className={"subheading-semibold descriptionchat-unreadcontext"}
          >
            {props.lastName + " " + props.firstName}
          </span>
        </div>
        <div className="descriptionchat-context-bottom">
          <span className="text-overflow-ellipsis body-regular">
            ISoft Team
          </span>
        </div>
      </div>
    </div>
  );
}

export default CompanyMemberScreen;
