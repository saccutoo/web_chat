
import React from 'react';
import TooltipScreen from '../../../../../../../libraries/Features/tooltip/tooltip.screen';
import { IconDeleteDisabled , IconVideoCircleLine , IconFullScreenArrow } from '../../../../../../../libraries/Icons/icon.screen';
import HeaderConversationAdapter from './header-conversation.adapter';

 
function HeaderConversationInBoxChatScreen(props: any) {
    
    const { roomIdBoxChat , onClickToClose , onClickToFullScreen } = props;
    const userId = localStorage.getItem('userId');

    const clickCallVideo=()=>{              
        window.open(window.location.protocol + "/video-call?roomName=" + roomIdBoxChat + "&userId="+ userId + "&isCall=1","_blank","width=1000,height=1000"); 
   }

    const eleOptionHeader = (onSearch: any) => (
        <>
            <TooltipScreen context="Phóng to">
                <IconFullScreenArrow onClick={ onClickToFullScreen } className="cursor-pointer icon-svg--hover"></IconFullScreenArrow>
            </TooltipScreen>
            <TooltipScreen position={ ['bottom center'] } context="Gọi video">
                <IconVideoCircleLine onClick={ clickCallVideo  } className="cursor-pointer icon-svg--hover"></IconVideoCircleLine>
            </TooltipScreen>
            <TooltipScreen context="Thoát">
                <IconDeleteDisabled onClick={ onClickToClose } className="cursor-pointer icon-svg--hover" ></IconDeleteDisabled>
            </TooltipScreen>
        </>
    )

    return (
        <>
            <TooltipScreen context="Phóng to">
                <IconFullScreenArrow onClick={ onClickToFullScreen } className="cursor-pointer icon-svg--hover"></IconFullScreenArrow>
            </TooltipScreen>
            <TooltipScreen position={ ['bottom center'] } context="Gọi video">
                <IconVideoCircleLine onClick={ clickCallVideo  } className="cursor-pointer icon-svg--hover"></IconVideoCircleLine>
            </TooltipScreen>
            <TooltipScreen context="Thoát">
                <IconDeleteDisabled onClick={ onClickToClose } className="cursor-pointer icon-svg--hover" ></IconDeleteDisabled>
            </TooltipScreen>
        </>
    );
}

export default HeaderConversationInBoxChatScreen;
