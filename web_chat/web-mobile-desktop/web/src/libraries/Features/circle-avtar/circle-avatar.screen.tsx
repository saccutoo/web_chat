import React from 'react';
import './circle-avatar.scss';
import { ICircleAvatar } from './circle-avatar.props';
import { IconDeleteDisabled } from '../../Icons/icon.screen';

function CircleAvatarScreen(props : ICircleAvatar) {

  const  { src , isOnline , notiIcon , onRemove , canRomove , onClick , title } = props;
  let firstCharacter = null;

  if (typeof title === 'string'){
    firstCharacter = title.charAt(0).toUpperCase();
  }
  const styleInline = { 
    backgroundImage : `url(${src})` , 
    backgroundColor:"#d7e4e2",
    minWidth: props.width , 
    minHeight: props.height,
    cursor: props.hasCursor ? "pointer" : "initial"
  };

  return (
    <>
      <div 
        className={ "circleavatar-container " + props.class + (isOnline ? " isOnline" : "") } 
        style={ styleInline }
        onClick={ onClick && onClick }
      >
        {
          (!src || src === "null" || src === null) && (
            <p>
              {
                firstCharacter
              }
            </p>
          )
        }
        { 
          canRomove && <div className="circleavatar-remove flex-center cursor-pointer" onClick={ onRemove }>
                                <IconDeleteDisabled></IconDeleteDisabled>
                              </div>  
        }
        { notiIcon && <div className="circleavatar-noti">{ notiIcon }</div> }
      </div> 
    </>
  );
}

export default CircleAvatarScreen;


