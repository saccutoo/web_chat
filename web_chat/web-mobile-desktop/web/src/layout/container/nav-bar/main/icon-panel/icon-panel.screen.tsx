import React from 'react';
import { IconPanelModel } from './icon-panel.props';
import TooltipScreen from '../../../../../libraries/Features/tooltip/tooltip.screen';
import './icon-panel.scss';

function IconPanelScreen(props: IconPanelModel) {

  return (
    <TooltipScreen context={props.contextToolTip}>
      <div
        className={"navbar-iconpanel-container cursor-pointer flex-center " +
          (props.isActive ? "navbar-iconpanel-container--active " : "") +

          (props.className ? props.className : "")
        }
        onClick={props.onClick}
      >
        <div className="flex-center navbar-iconpanel-icon">
          {props.eleIcon}
          {(props.hasNotification > 0 ? (<div className="has-notification">{props.hasNotification}</div>) : "")}
        </div>
      </div>
    </TooltipScreen>

  );
}

export default IconPanelScreen;
