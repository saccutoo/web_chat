import React from 'react';
import VideoCallsScreen from '../../../features/video-calls/video-calls.screen';
import Sound from '../../../libraries/Features/video-call/audio.screen';
import IhcmVideoCallAdapter from './ihcm-video-call.adapter';

function IhcmVideoCallIframe() {
    const { setDisplayVideoCall } = IhcmVideoCallAdapter();

    return (
        <>
            <Sound></Sound>
            <VideoCallsScreen
                isBoxChat={true}
                setDisplayVideoCall={setDisplayVideoCall}>
            </VideoCallsScreen>
        </>
    );
}

export default IhcmVideoCallIframe;
