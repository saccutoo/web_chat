import React from 'react';
import { IToggleButton } from './toggle-button.interface';
import "../../Styles/base/hyper-button.scss";

function ToggleButton(props : IToggleButton) {
  return (
        <div className={"toggle-button " + props.customClass}>
          <div className="button">
            <input type="checkbox" className="checkbox"/>
            <div className="knobs"></div>
            <div className="layer"></div>
          </div>
        </div>
  );
}

export default ToggleButton;
