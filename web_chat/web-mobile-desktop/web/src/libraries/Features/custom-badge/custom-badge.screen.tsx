import React from 'react';
import { ICustomBadge } from './custom-badge.props';
import "./custom-badge.scss";

function CustomBadgeScreen(props : ICustomBadge) {
  return (
    <span className={ "custombadge-container " + props.class}>
        {
          props.text
        }
    </span>
  );
}

export default CustomBadgeScreen;
