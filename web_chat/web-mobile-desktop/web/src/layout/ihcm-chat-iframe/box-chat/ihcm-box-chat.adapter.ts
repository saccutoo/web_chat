
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import ReconnectingWebSocket from "reconnecting-websocket";
import { Subscription } from "rxjs";
import { APP_CONFIGS } from "../../../helpers/api/app-config";
import EventBus, { EventBusName } from "../../../helpers/api/event-bus";
import { IHCM_MESSAGE } from "../../../libraries/Enum/ihcm-message";

var socket: ReconnectingWebSocket;
const options = {
    WebSocket: WebSocket, // custom WebSocket constructor
    connectionTimeout: 1000,
    maxRetries: 10,
};
socket = new ReconnectingWebSocket(
    `${APP_CONFIGS.URL_PUSH_STREAM}/ws?Channels=` + localStorage.getItem('userId'),
    [],
    options
);

// created by tuda
function IhcmBoxChatAdapater() {
    const history = useHistory();
    const subscriptions = new Subscription();
    const [roomId, setRoomId] = useState<string>();

    // tuda
    useEffect(() => {
        socket.onmessage = (message) => {
            var data = JSON.parse(decodeURIComponent(JSON.parse(message.data).text));
            EventBus.getInstance().post({
                type: EventBusName.IHCM_PUSH_ROOM_ID_TO_BOX_CHAT,
                payload: data
            });
        };
    }, []);

    const handler = useCallback((e) => {
        const payload = e?.payload;
        if (payload) {
          switch (e?.type) {
            case EventBusName.IHCM_PUSH_ROOM_ID_TO_BOX_CHAT:
                if (e.payload.value.roomId) {
                    setRoomId(e.payload.value.roomId);
                }
            break;
          }
        }
    }, [])

    useEffect(() => {
        subscriptions.add(
            EventBus.getInstance().events.subscribe(handler)
        );

        return () => {
            subscriptions.unsubscribe();
        };
    }, [handler]);

    const onClickToFullScreen = () => {
        window.open('http://172.20.50.96:3000', '_blank');
    }

    const onClickToClose = () => {
        console.log("-----Send from box chat: CLOSE_BOX_CHAT-----")
        window.parent.postMessage(IHCM_MESSAGE.CLOSE_BOX_CHAT, "*");
    }


    return {
        onClickToFullScreen,
        onClickToClose,
        roomId
    }
}

export default IhcmBoxChatAdapater;