import React from 'react';
import { IRadioButton } from './radio-button.interface';
import "../../Styles/base/hyper-button.scss";

function RadioButton(props : IRadioButton) {
  return (
    <div className={"radio" + props.customClass}>
        <label className={"" + props.disabled}>
        <input type="radio"/>
        <i></i> {props.label}
        </label>
    </div>
  );
}

export default RadioButton;
