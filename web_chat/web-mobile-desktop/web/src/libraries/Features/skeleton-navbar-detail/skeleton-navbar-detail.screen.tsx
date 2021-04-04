import React from "react";
import { ENUM_KIND_OF_ICONPANEL } from "../../Enum/icon-panel";
import { Skeleton } from "./loading-skeleton.screen";
import './skeleton-navbar-detail.scss';

function SkeletonNavbarDetailScreen(props: any) {
  const { iconpanel } = props;

  const showListContext = () => {
    if(iconpanel === ENUM_KIND_OF_ICONPANEL.NOTI){
      return (
        <div>
          <div className="notification-context2">
            <Skeleton borderRadius={25} />
          </div>
          <span className="notification-time2">
            <Skeleton borderRadius={25} />
          </span>
        </div>
      )
    } else if(iconpanel === ENUM_KIND_OF_ICONPANEL.CREATE_GROUP){
      return (
        <>
          <div className="descriptionchat-context-top">
            <span>
              <Skeleton borderRadius={25} />
            </span>
          </div>
          <div className="descriptionchat-context-bottom">
            <span className="text-overflow-ellipsis width-200">
              <Skeleton borderRadius={25} />
            </span>
          </div>
        </>
      ) 
    } else{
      return (
        <>
          <div className="descriptionchat-context-top">
            <span className={ "descriptionchat-username2" }>
              <Skeleton borderRadius={25} />
            </span>
            {
              iconpanel === ENUM_KIND_OF_ICONPANEL.MESSAGES && (
                <>
                  <span className="descriptionchat-groupchat2">
                    <Skeleton borderRadius={25} />
                  </span>
                  <span className="descriptionchat-timeoflastmess2">
                    <Skeleton borderRadius={25} />
                  </span>
                </>
              )
            }
          </div>
          <div className="descriptionchat-context-bottom">
            <span className="text-overflow-ellipsis width-200">
              <Skeleton borderRadius={25} />
            </span>
            {
              iconpanel === ENUM_KIND_OF_ICONPANEL.MESSAGES && (
                <div className="descriptionchat-icon-unread2">
                  <Skeleton borderRadius={25} />
                </div>
              )
            }
          </div>
        </>
      ) 
    }
  }

  const getClassNameContainer = () =>{
    if(iconpanel === ENUM_KIND_OF_ICONPANEL.NOTI){
      return "descriptionchat-container notification-container";
    }
    if(iconpanel === ENUM_KIND_OF_ICONPANEL.CREATE_GROUP){
      return "descriptionchat-container skeleton-creategroup-container";
    }
    return "descriptionchat-container";
  }

  return (
    <div className={ getClassNameContainer() }>
      <div className="descriptionchat-image2 avatar-circle-default">
        <Skeleton borderRadius={25} />
      </div>
      <div className="descriptionchat-context">
        {
          showListContext()
        }
      </div>
    </div>
);
  
}

export default SkeletonNavbarDetailScreen;

