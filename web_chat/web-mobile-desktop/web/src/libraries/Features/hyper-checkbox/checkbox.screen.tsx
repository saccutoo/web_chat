import React from 'react';
import { ICheckbox } from './checkbox.interface';
import "../../Styles/base/hyper-button.scss";

function Checkbox(props : ICheckbox) {
  return (
    <div className={"checkbox" + props.customClass}>
    <label className={"" + props.disabled}>
    <input type="checkbox"/>
    <i></i> {props.label}
    </label>
    </div>
  );
}

export default Checkbox;
