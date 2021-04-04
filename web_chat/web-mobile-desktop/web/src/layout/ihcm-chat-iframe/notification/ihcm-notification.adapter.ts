
import { useEffect, useRef, useState } from "react";
import { IHCM_MESSAGE } from "../../../libraries/Enum/ihcm-message";

function IhcmNotifiationAdapater() {
    const toggleListGroup = async () => {
        console.log("-----Send from notification: TOGGLE_GROUP-----")
        window.parent.postMessage(IHCM_MESSAGE.TOGGLE_LIST_GROUP, "*");
    }

    return {
        toggleListGroup
    }
}

export default IhcmNotifiationAdapater;