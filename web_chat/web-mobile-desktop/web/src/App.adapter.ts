
import axios from "axios";
import React, { useReducer } from "react";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import ReconnectingWebSocket from "reconnecting-websocket";
import AppServices from "./App.services";
import { post } from "./helpers/api/api-helper";
import { APP_CONFIGS } from "./helpers/api/app-config";
import EventBus, { EventBusName } from "./helpers/api/event-bus";
import { PushStreamTypes } from "./helpers/api/push-stream-types";
import { SUCCESS } from "./helpers/api/status";
import { URL_PATHS } from "./helpers/networking/url-paths";
import { USER } from "./libraries/Enum/user";
import { $bean } from "./libraries/hyd/hyd-bean-utils";

var sockets: ReconnectingWebSocket[] = [];
var socket = new ReconnectingWebSocket(`${APP_CONFIGS.URL_PUSH_STREAM}/ws?Channels=` + localStorage.getItem("userId"));

const options = {
    WebSocket: WebSocket, // custom WebSocket constructor
    connectionTimeout: 1000,
    maxRetries: 10,
};

function AppAdapater() {
    const history = useHistory();

    const [hasVideo, setHasVideo] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<any>();

    /*
    * created by tuda
    * get Token from url when redirect from ihcm
    */
    useEffect(() => {
        const init = async () => {
            console.log("test_init_app...");
            const userId: string = localStorage.getItem("userId") || "";
            if (userId) {
                pushStreamService.subChat(userId);
            }
            const accessToken: any = localStorage.getItem("access_token");
            const refreshToken = localStorage.getItem("refresh_token");
            if (accessToken) {
                getProfile(accessToken);
            }
            // if (!accessToken && refreshToken) {
            //     const response = await AppServices.getInstance().getTokenByRefreshToken(refreshToken);
            //     if (response && response.status == SUCCESS) {
            //         localStorage.setItem("access_token", response.data.access_token);
            //         localStorage.setItem("refresh_token", response.data.refresh_token)
            //     }
            // } else if (!accessToken && !refreshToken) {
            //     history.push("/login");
            // }
            // console.log("Token...");
            // const urlParams = new URLSearchParams(window.location.search);
            // let token: any = urlParams.get("token");
            // if (token) {
            //     localStorage.setItem("verify_token", token);
            // } else {
            //     token = localStorage.getItem('verify_token');
            // }
            // if (localStorage.getItem('verify_token') === null) {
            //     window.location.href = APP_CONFIGS.REACT_APP_DOMAIN_IHCM;
            // }
        }
        
        init();
    }, []);

    const getProfile = async (token: string) => {
        console.log(APP_CONFIGS.REACT_APP_DOMAIN_IHCM + `api/employee/detailProfile`)
        await axios({
            method: "POST",
            url: APP_CONFIGS.REACT_APP_DOMAIN_IHCM + `api/employee/detailProfile`,
            headers: {
                Authorization: "Bearer " + token,
            },
            data: {},
            timeout: 30000,
        }).then(async (res: any) => {
            console.log(res);
            let userRes = res.data;
            let ihcmUser = {
                id: userRes.id,
                userName: userRes.fullName,
                email: userRes.email,
                password: userRes.user.password,
                firstName: userRes.firstName,
                lastName: userRes.lastName,
                avatar: userRes.fullPathPhoto,
                salt: userRes.user.salt,
                gender: userRes.gender === "F" ? "0" : "1",
                status: "1",
                isAdmin: userRes.orgAdmin ? "1" : "0",
                lastLogin: userRes.user.loginDate,
                createdAt: userRes.user.createdDate,
                orgId: userRes.user.orgId,
            };
            localStorage.setItem("userId", userRes.id);
            localStorage.setItem("loginUser", JSON.stringify(ihcmUser));
            const response = await post(
                URL_PATHS.POST_USER,
                ihcmUser,
                true
            );
            if (response) {
                ihcmUser.avatar = response.avatar;
            }
            setUserInfo(ihcmUser)
        }).catch((err) => 
            console.log(err)
        );
    };

    // video call created by vinhtq
    useEffect(() => {
        if (window.location.pathname.indexOf("video-call") > -1) {
            setHasVideo(true);
        }
    }, []);

    const pushStreamService = {
        messageReceived: (message: any) => {
            console.log("-----Message Received-----");
            let newMessage = JSON.parse(message);
            console.log("test_messageReceived_1" + JSON.stringify(newMessage));
            if ($bean.isNotEmpty(newMessage)) {
                switch (newMessage.type) {
                    case PushStreamTypes.NEW_MESSENGER: {
                        console.log("test_messageReceived_123");
                        EventBus.getInstance().post({
                            type: EventBusName.NEW_MESSENGER,
                            payload: newMessage.value,
                        });
                        break;
                    }
                    case PushStreamTypes.TYPE_NOTIFICATION: {
                        EventBus.getInstance().post({
                            type: EventBusName.PUSH_NOTIFICATION,
                            payload: newMessage.value,
                        });
                        break;
                    }
                    case PushStreamTypes.UPDATE_MESSENGER: {
                        EventBus.getInstance().post({
                            type: EventBusName.UPDATE_MESSENGER,
                            payload: newMessage.value,
                        });
                        break;
                    }
                    case PushStreamTypes.UPDATE_ONLINE_OFFLINE: {
                        EventBus.getInstance().post({
                            type: EventBusName.UPDATE_ONLINE_OFFLINE,
                            payload: newMessage.value,
                        });
                        break;
                    }
                    case PushStreamTypes.CREATE_CHAT_ROOM: {
                        EventBus.getInstance().post({
                            type: EventBusName.CREATE_CHAT_ROOM,
                            payload: newMessage.value,
                        });
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        },

        subChat: (userId: string) => {
            console.log("-----Sub chat-----");
            console.log(`${APP_CONFIGS.URL_PUSH_STREAM}/ws?Channels=` + userId);
            socket = new ReconnectingWebSocket(
                `${APP_CONFIGS.URL_PUSH_STREAM}/ws?Channels=` +
                userId,
                [],
                options
            );

            socket.onopen = async () => {
                // connection opened
                console.log("test_Connected: ", userId);

                // const user = {
                //     id: localStorage.getItem("userId"),
                //     isOnline: USER.ONLINE
                // }
                // await post(
                //     URL_PATHS.UPDATE_ONLINE_OFFLINE,
                //     user,
                //     true
                // );
            };

            socket.onmessage = (e) => {
                console.log("-----on message");
                pushStreamService.messageReceived(
                    decodeURIComponent(JSON.parse(e.data).text)
                );
                // socket.close();
                // console.log("-----Closed socket-----")
            };

            socket.onerror = (e: any) => {
                // an error occurred
                console.log("test_socket_err: ", e);
                clearInterval();
                socket.close();

                setTimeout(function() {
                    pushStreamService.subChat(userId);
                }, 1000);
            };

            socket.onclose = async (e: any) => {
                // const user = {
                //     id: localStorage.getItem("userId"),
                //     isOnline: USER.OFFLINE
                // }
                // await post(
                //     URL_PATHS.UPDATE_ONLINE_OFFLINE,
                //     user,
                //     true
                // );
                console.log(
                    "test_Socket is closed. Reconnect will be attempted in 1 second.",
                    e.reason
                );
            };
            // sockets.push(ws);
        },
        closeSocket: () => {
            console.log("test_closeSocket");
            socket.close();
        },
        closeAllSocket: () => {
            console.log("test_closeAllSocket");
            sockets.map((s) => s.close());
        },
    };

    useEffect(() => {
        window.addEventListener("beforeunload", async () => {
          await socket.close();
        });
    }, []);

    return {
        hasVideo,
        userInfo
    }
}

export default AppAdapater;