import React from 'react';
import Popup from 'reactjs-popup';
import { IconDeleteDisabled } from '../../Icons/icon.screen';
import { IModal } from './modal.props';
import './modal.scss';

const ModalScreen = (props: IModal) => (
  <Popup
    trigger={props.children}
    open={ props.open }
    modal
    nested
    className="modal"
    position={['right center', 'bottom center', 'left center', 'top center']}
  >
    {(close:any) => (
      <div className="modal-container">
        <div className="modal-header-container modal-header-bottomborder">
          <span className="modal-header-content subheading-bold">
            {
              props.headerContent
            }
          </span>
          <div className="modal-header-close cursor-pointer" onClick={props.funtionCloseNew ? props.funtionCloseNew  : close}>
            <IconDeleteDisabled></IconDeleteDisabled>
          </div>
        </div>
        <div className={ props.hasPadding ? "modal-content-container" : ""}>
          {
            props.contextHasClose && props.contextHasClose(close)
          }
          {
            props.context
          }
        </div>
      </div>
    )}
  </Popup>
);

export default ModalScreen;