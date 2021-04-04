import React from 'react';
import Popup from 'reactjs-popup';
import MainPopupAdapter from './main-popup.adapter';
import './main-popup.scss';

const MainPopupScreen = (props: any) =>{ 
  const {ref, 
    closePopup } = MainPopupAdapter()
  
  return (
    <Popup
      ref={ref}
      trigger={
        props.children
      }
      offsetY={props.offsetY ? props.offsetY : null}
      offsetX={props.offsetX? props.offsetX : null}
      position={['bottom left', 'bottom center' , 'bottom right']}
      closeOnDocumentClick={ true }
      closeOnEscape={ true }
      arrow={ false }
      repositionOnResize={ true }
    >
      <div className={"mainpopup-container " + (props.customStyle ? props.customStyle : '')}>
        {
          props.context(closePopup)
        }
      </div>
    </Popup>
  );
}

export default MainPopupScreen;