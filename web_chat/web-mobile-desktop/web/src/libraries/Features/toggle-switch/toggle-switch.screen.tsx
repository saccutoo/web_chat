import React from 'react';
import './toggle-switch.scss';

const ToggleSwitchScreen = () =>{
    return(
        <label className="switch">
            <input type="checkbox" defaultChecked={ true }></input>
            <span className="slider round"></span>
        </label>
    )
}

export default ToggleSwitchScreen;