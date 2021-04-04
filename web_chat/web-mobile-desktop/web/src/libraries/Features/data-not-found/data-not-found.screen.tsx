import React from 'react';
import { ENUM_KIND_OF_NOTFOUNDICON } from '../../Enum/not-found-icon';
import { IDataNotFound } from './data-not-found.props';
import './data-not-found.scss';
import { ReactComponent as IconNotFoundData } from '../../Icons/iconnotfounddata.svg';
import { ReactComponent as IconNotFoundChat } from '../../Icons/iconnotfoundchat.svg';
import { ReactComponent as IconNotFoundNoti } from '../../Icons/iconnotfoundnoti.svg';
import { IconFreepikCharacterInject } from '../../Icons/icon.screen';

function DataNotFoundScreen(props : IDataNotFound) {

  const getIcon = () =>{
    switch (props.icon) {
      case ENUM_KIND_OF_NOTFOUNDICON.CHAT:
        return <IconNotFoundChat className="datanotfound-icon" onClick={props?.onClick}></IconNotFoundChat>;
      case ENUM_KIND_OF_NOTFOUNDICON.DATA:
        return <IconNotFoundData className="datanotfound-icon" onClick={props?.onClick}></IconNotFoundData>;
      case ENUM_KIND_OF_NOTFOUNDICON.NOTI:
        return <IconNotFoundNoti className="datanotfound-icon" onClick={props?.onClick}></IconNotFoundNoti>;
      case ENUM_KIND_OF_NOTFOUNDICON.MESSAGE:
        return <img src={ '/images/sayhi.png' } alt="" className="datanotfound-icon" onClick={props?.onClick}  />;   
      case ENUM_KIND_OF_NOTFOUNDICON.SEARCH_MESSAGE:
        return <IconFreepikCharacterInject></IconFreepikCharacterInject> 
    }
  }

  return (
    <div className={"datanotfound-container " + ( props.isPosition ? "datanotfound-container--isposition" : "" )}>
      <div className={"datanotfound-main " + ( props?.hasntCursor ? "" : "cursor-pointer" )}>
        <div className={ props.hasTextCenter ? "datanotfound-main--textcenter" : ""}>
          { getIcon() }
        </div>
        <span>
          { props.text }
        </span>
      </div>
    </div>
  );
}

export default DataNotFoundScreen;
