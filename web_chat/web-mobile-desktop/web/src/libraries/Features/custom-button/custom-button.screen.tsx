import React from 'react';
import { ICustomButton } from './custom-button.props';
import "./custom-button.scss";

function CustomButtonScreen(props : ICustomButton) {
  return (
    <button onClick={ props.onClick } className={ "custombutton-container " + props.class}>
      {
        props.text
      }
    </button>
  );
}

export default CustomButtonScreen;
