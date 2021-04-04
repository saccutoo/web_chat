import React from 'react';
import { IIconCirclePanel } from './icon-circle-panel.props';
import './icon-circle-panel.scss';

function IconCirclePanel(props : IIconCirclePanel) {
  const style = {
    padding: props.padding,
    width: props.width ? props.width : "",
    height: props.height ? props.height : "",
  }
  return (
    <div className={ "iconcirclepanel-container " + props.class } style={ style } onClick={ props.onClick }>
      { props.icon && props.icon }
      { props.srcIcon && (
        <img src={ props.srcIcon } alt=""/>
      )}
    </div>
  );
}

export default IconCirclePanel;
