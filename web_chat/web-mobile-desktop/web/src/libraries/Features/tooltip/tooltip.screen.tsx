import React from 'react';
import Popup from 'reactjs-popup';
import './tooltip.scss';

// const POSITION_TYPES = [
//   'top left',
//   'top center',
//   'top right',
//   'right top',
//   'right center',
//   'right bottom',
//   'bottom left',
//   'bottom center',
//   'bottom right',
//   'left top',
//   'left center',
//   'left bottom',
//   'center center',
// ];

const TooltipScreen = (props: any) =>{
    return (
        <div className={"example-warper " + props.customClass}>
          <Popup
            trigger={
              props.children
            }
            position={ props.position ? props.position : ['right center', 'bottom center', 'left center', 'top center'] }
            on={['hover', 'focus']}
            arrow={true}
          >
            <div className="tooltip-container">
              {
                props.context
              }
            </div>
          </Popup>
        </div>
      );
}

export default TooltipScreen;