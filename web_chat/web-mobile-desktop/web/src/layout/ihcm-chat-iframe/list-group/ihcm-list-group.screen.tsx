import React from 'react';
import './ihcm-list-group.scss';
import { IconFullScreenArrow, IconPenEditSquare } from "../../../libraries/Icons/icon.screen";
import CustomInputScreen from '../../../libraries/Features/custom-input/custom-input.screen';
import { SrcSearchLoupe } from '../../../libraries/Icons/icon-src';
import IhcmListGroupAdapater from './ihcm-list-group.adapter';
import InfiniteScrollFieldScreen from '../../../libraries/Features/infinity-scroll-field/infinity-scroll-field.screen';
import { ENUM_KIND_OF_ICONPANEL } from '../../../libraries/Enum/icon-panel';
import DescriptionChatScreen from '../../container/nav-bar/nav-bar-items/nav-messages/description-chat/description-chat.screen';
import DetailPopupScreen from '../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import TooltipScreen from '../../../libraries/Features/tooltip/tooltip.screen';
import MainPopupScreen from '../../../libraries/Features/popup/main-popup/main-popup.screen';
import SkeletonNavbarDetailScreen from '../../../libraries/Features/skeleton-navbar-detail/skeleton-navbar-detail.screen';
import SearchFieldScreen from '../../../features/nav-detail/search-field/search-field.screen';

function IhcmListGroupIframe(props: any) {
  const iconpanel = ENUM_KIND_OF_ICONPANEL.MESSAGES;

  const {
    listGroup,
    totalPages,
    page, setPage,
    isUpdating,
    setActivedGroup,
    activedId,
    openNewTabChat,
    openNewTabCreateChat,
    textSearch, setTextSearch,
    isShowSkeleton,
    searchDescriptionChatList,
    hasSearch, setHasSearch
  } = IhcmListGroupAdapater();

  const styleCustomInput = {
    backgroundImage: `url('${SrcSearchLoupe}')`,
    backgroundPosition: "3% 50%",
    padding: "15px 20px 12px 40px"
  };

  const length = listGroup.length;

  const showListGroup = () => {
    if (length === 0) {
      return <></>
    }

    return listGroup.map((item: any, index: number) => (
      <DescriptionChatScreen
        key={index}
        descriptionChat={item}
        activedDescriptionChat={activedId}
        onClick={() => { setActivedGroup(item.id) }}
      ></DescriptionChatScreen>
    ))
  }

  const openNewTabCreateChatPerson = () => {
    openNewTabCreateChat(true);
  }

  const openNewTabCreateChatGroup = () => {
    openNewTabCreateChat(false);
  }

  const listEles = [
    {
      onClick: openNewTabCreateChatPerson,
      icon: null,
      text: "Tạo mới chat",
      eleContext: null,
    },
    {
      onClick: openNewTabCreateChatGroup,
      icon: null,
      text: "Tạo nhóm chat",
      eleContext: null,
    },
  ];

  const eleDetailPopup = (onClosePopup: any) => (<DetailPopupScreen
    listEles={listEles}
    onClosePopup={onClosePopup}
  ></DetailPopupScreen>);

  const avatarDefault = "https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg";

  return (
    <div className={"list-group-ihcm"}>
      <div className="header">
        <div className="title">
          <span className="subheading-semibold">Trò chuyện</span>
          <div className="float-right height-48 padding-8-0">
            <TooltipScreen customClass={'float-right'} context="Tạo tin nhắn">
              <IconFullScreenArrow
                className="img-24 margin-left-12 cursor-pointer"
                onClick={openNewTabChat}>
              </IconFullScreenArrow>
            </TooltipScreen>
            <MainPopupScreen context={eleDetailPopup} offsetX={-115} offsetY={-10}>
              <div className="float-left">
                <TooltipScreen customClass={'float-left'} context="Tạo tin nhắn">
                  <IconPenEditSquare className="img-24 margin-left-12 cursor-pointer"></IconPenEditSquare>
                </TooltipScreen>
              </div>
            </MainPopupScreen>

          </div>
          <div className="search-group">
            <CustomInputScreen
              style={styleCustomInput}
              class=""
              placeHolder="Tìm kiếm cuộc trò chuyện"
              isMultiline={false}
              isTextArea={false}
              onChange={setTextSearch}
              hasClearText={true}
              onClick={() => {
                setHasSearch(true)
              }}
              value={textSearch}
              setValue={setTextSearch}
              id="descriptionchatlist-input-index"
            ></CustomInputScreen>
          </div>


        </div>
      </div>
      <div className="body">
        {
          hasSearch && <SearchFieldScreen
            isBoxChat={true}
            customClass={'in-iframe-chat'}
            searchDescriptionChatList={searchDescriptionChatList} />
        }

        {listGroup.length === 0 && (
          <span className="body-semibold-hinted">Không có kết quả nào hợp lệ</span>
        )
        }

        {
          (listGroup.length !== 0) && !isShowSkeleton && (
            <InfiniteScrollFieldScreen
              child={showListGroup()}
              iconpanel={iconpanel}
              length={length}
              totalPages={totalPages}
              className={"body"}
              isUpdating={isUpdating}
              page={page}
              setPage={setPage}
            ></InfiniteScrollFieldScreen>
          )
        }

        {
          isShowSkeleton && (
            <>
              <SkeletonNavbarDetailScreen iconpanel={iconpanel}></SkeletonNavbarDetailScreen>
              <SkeletonNavbarDetailScreen iconpanel={iconpanel}></SkeletonNavbarDetailScreen>
            </>
          )
        }
      </div>

      <div className="footer">
        <div className="footer-wraper" onClick={openNewTabChat}>
          Tất cả tin nhắn
        </div>
      </div>

    </div>
  );
}

export default IhcmListGroupIframe;
