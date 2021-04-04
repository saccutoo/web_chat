import React from 'react';
import { ENUM_KIND_OF_ATTACHMENT } from '../../../../../../../../../libraries/Enum/attachment';
import checkAttachment from '../../../../../../../../../libraries/Functions/check-attachment';
import downloadFile from '../../../../../../../../../libraries/Functions/download-file';
import niceBytes from '../../../../../../../../../libraries/Functions/nice-bytes';
import { IconDownloadSaveUpload, IconExcel, IconGimFile, IconLink, IconPdf, IconPowepoint, IconShareArrowSquare, IconWord } from '../../../../../../../../../libraries/Icons/icon.screen';
import { IFileChat } from './file-context-chat.props';
import './file-context-chat.scss';

function FileContextChatScreen(props: IFileChat) {

    const redirectWeb = (link: string) => {
        window.open(
            link,
            '_blank' // <- This is what makes it open in a new window.
        );
    }
    const getIcon = (name: string) => {
        const type = checkAttachment(name);

        switch (type) {
            case ENUM_KIND_OF_ATTACHMENT.DOC:
                return <IconWord></IconWord>
            case ENUM_KIND_OF_ATTACHMENT.EXCEL:
                return <IconExcel></IconExcel>
            case ENUM_KIND_OF_ATTACHMENT.PDF:
                return <IconPdf></IconPdf>
            case ENUM_KIND_OF_ATTACHMENT.POWERPOINT:
                return <IconPowepoint></IconPowepoint>

            default:
                return <IconGimFile></IconGimFile>
        }
    }

    // useEffect(() =>{
    //     (() => {
    //         getLinkPreview('https://www.youtube.com/watch?v=MejbOFk7H6c')
    //         .then((data) => console.debug(data));
    //     })();
    // })

    return (
        <div className="filechat-container">
            {
                props.isFile ? (
                    getIcon(props.context)
                ) : (
                    <IconLink className="filechat-container-image cursor-pointer icon-svg--hover"></IconLink>
                )
            }
            <div className="filechat-maincontext">
                <div className="filechat-context">
                    <h5 className="width-400">
                        <a href={props.guiId} target="_blank" rel="noreferrer">
                            {
                                props.isFile
                                    ?
                                    (<div className="text-name text-overflow-ellipsis">
                                        <p>
                                            {props.context.split('.').shift()}
                                        </p>
                                        <span>
                                            .
                                            {props.context.split('.').pop()}
                                        </span>
                                    </div>)
                                    :
                                    ( props.context )
                            }

                        </a>
                    </h5>
                    <div className="app-mainfont">
                        <h5>{ niceBytes(props.fileSize)} </h5>
                    </div>
                </div>
                <div className="filechat-iconbutton">
                    {
                        props.isFile ? (
                            <IconDownloadSaveUpload className="img-24 cursor-pointer" onClick={() => { downloadFile(props.guiId) }}></IconDownloadSaveUpload>
                        ) : (
                            <IconShareArrowSquare className="cursor-pointer" onClick={() => { redirectWeb(props.guiId) }}></IconShareArrowSquare>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default FileContextChatScreen;