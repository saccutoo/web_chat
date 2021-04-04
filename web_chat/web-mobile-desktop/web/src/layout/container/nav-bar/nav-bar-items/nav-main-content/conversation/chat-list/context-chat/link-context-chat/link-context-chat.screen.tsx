import React, { useEffect } from 'react';
import { IFileChat } from './link-context-chat.props';
import './link-context-chat.scss';
import { IconDownloadSaveUpload, IconGimFile, IconLink, IconShareArrowSquare } from '../../../../../../../../../libraries/Icons/icon.screen';
// import { getLinkPreview } from 'link-preview-js';
// import { ReactTinyLink } from "react-tiny-link";


function LinkContextChatScreen(props: IFileChat) {

    const redirectWeb = (link: string) => {
        window.open(
            link,
            '_blank' // <- This is what makes it open in a new window.
        );
    }

    // useEffect(() =>{
    //     (() => {
    //         getLinkPreview('https://www.youtube.com/watch?v=MejbOFk7H6c')
    //         .then((data) => console.debug("12333333333333333333" + data));
    //     })();
    // })

    return (
        <div className="linkchat-container">
            {
                props.isFile ? (
                    <IconGimFile className="linkchat-container-image cursor-pointer icon-svg--hover"></IconGimFile>
                ) : (
                        <IconLink className="linkchat-container-image cursor-pointer icon-svg--hover"></IconLink>
                    )
            }
            <div className="linkchat-maincontext">
                <div className="linkchat-context">
                    <h5 className="width-200 text-overflow-ellipsis">
                        <a href={props.context} target="_blank" rel="noreferrer">
                            {props.context}
                        </a>
                    </h5>
                    <div className="app-mainfont">
                        <h5>{props.fileSize}</h5>
                    </div>
                </div>
                <div className="linkchat-iconbutton">
                    {
                        props.isFile ? (
                            <IconDownloadSaveUpload className="cursor-pointer" onClick={() => { redirectWeb(props.context) }}></IconDownloadSaveUpload>
                        ) : (
                                <IconShareArrowSquare className="cursor-pointer" onClick={() => { redirectWeb(props.context) }}></IconShareArrowSquare>
                            )
                    }
                </div>
            </div>

        </div>
    )
}

export default LinkContextChatScreen;