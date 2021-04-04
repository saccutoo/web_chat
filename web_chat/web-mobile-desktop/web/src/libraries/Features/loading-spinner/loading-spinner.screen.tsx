import React from 'react';

import './loading-spinner.scss';

function LoadingSpinnerScreen(props:any) {
  return (
    <div className={"loader-container " + (props.class)}></div>
  );
}

export default LoadingSpinnerScreen;
