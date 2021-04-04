import React from "react";
import { ENUM_KIND_OF_ICONPANEL } from "../../../../../../../libraries/Enum/icon-panel";
import { ENUM_KIND_OF_STATUS } from "../../../../../../../libraries/Enum/status";
import CircleAvatarScreen from "../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen";
import CustomInputScreen from "../../../../../../../libraries/Features/custom-input/custom-input.screen";
import GoBackButtonScreen from "../../../../../../../libraries/Features/goback-button/goback-button.screen";
import getApiUrl from "../../../../../../../libraries/Functions/get-api-url";
import { SrcSearchLoupe } from "../../../../../../../libraries/Icons/icon-src";
import { ICompanyMember } from "../../../nav-company-members/company-member/company-member.props";
import InfiniteScrollCompanyMemberListScreen from "../../../nav-company-members/infinite-scroll/infinite-scroll-company-member-list.screen";
import CreatePersonalAdapter from "./create-personal.adapter";
import "./create-personal.scss";

const styleCustomInput = {
  backgroundImage: `url('${SrcSearchLoupe}')`,
  backgroundPosition: "2% 50%",
  padding: "12px 20px 12px 40px",
  borderRadius: "8px",
  fontSize: "1rem",
};

function CreatePersonalScreen() {
  const {
    createChatRoom,
    changeSearch,
    textSearch
  } = CreatePersonalAdapter();

  const showCompanyMember = (memberList: ICompanyMember[]) => {
    const length = memberList.length;
    if (length > 0) {
      return memberList.map((member: ICompanyMember, index: number) => {
        return (
          <div key={index}>
            <div
              className="bodycreategroup-main-body-selecteduserpanel cursor-pointer"
              onClick={() => createChatRoom(member.id)}
            >
              <CircleAvatarScreen
                src={ getApiUrl(member.avatar) }
                isOnline={member.status === ENUM_KIND_OF_STATUS.ACTIVE}
                class="img-48"
                width=""
                height=""
                hasCursor={true}
              ></CircleAvatarScreen>
              <p>{member.lastName + " " + member.firstName}</p>
            </div>
            <div className="bodycreategroup-main-body-separate"></div>
          </div>
        );
      });
    }
  };
  const iconpanel = ENUM_KIND_OF_ICONPANEL.CREATE_GROUP;

  return (
    <>
      <div className="headercreatepersonal-container padding-16">
        <GoBackButtonScreen></GoBackButtonScreen>

        <div className="headercreategroup-title padding-16">
          <p className="subheading-semibold">Tạo cuộc trò chuyện</p>
        </div>
        <div></div>
      </div>

      <div className={"bodypanel-container"}>
        <div className="bodypanel-detail-container bodycreatepersonal-container">
          <div className={"bodycreategroup-main"}>
            <span className="subheading-semibold padding-12">
              Chọn người trò chuyện
            </span>
            <div className="bodycreategroup-main-body center padding-12">
              <CustomInputScreen
                style={styleCustomInput}
                hasClearText={true}
                placeHolder="Nhập tên người cần tìm kiếm"
                class=""
                isMultiline={false}
                isTextArea={false}
                onChange={changeSearch}
              ></CustomInputScreen>

              {/* {!isShowSkeleton && ( */}
              <InfiniteScrollCompanyMemberListScreen
                className={"bodycreategroup-main-body-selecteduser"}
                showCompanyMemberList={showCompanyMember}
                iconpanel={ iconpanel }
                textSearch={ textSearch }
              ></InfiniteScrollCompanyMemberListScreen>
              {/* )
             } */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePersonalScreen;
