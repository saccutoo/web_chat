import React from 'react';
import file from '../../../../../../../../../helpers/services/file';
import { ENUM_KIND_OF_ATTACHMENT } from '../../../../../../../../../libraries/Enum/attachment';
import { IMiniImage } from '../../../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full.props';
import checkAttachment from '../../../../../../../../../libraries/Functions/check-attachment';
import downloadFile from '../../../../../../../../../libraries/Functions/download-file';
import getApiUrl from '../../../../../../../../../libraries/Functions/get-api-url';
import niceBytes from '../../../../../../../../../libraries/Functions/nice-bytes';
import { IconDownloadSaveUpload, IconExcel , IconGimFile , IconPdf, IconPowepoint, IconWord } from '../../../../../../../../../libraries/Icons/icon.screen';
import ImageContextChatAdapter from './image-context-chat.adapter';
import { IImageContextChat } from './image-context-chat.props';
import './image-context-chat.scss';

function ImageContextChatScreen(props: IImageContextChat) {
    const list = ImageContextChatAdapter(props) || [];

    const getIcon = (name: string) =>{
        const type = checkAttachment(name);

        switch(type){
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

    const showImages = () => {
        return list.map((file: any, index: number) => {
            const url = getApiUrl(file.guiId);
            if (file.type === ENUM_KIND_OF_ATTACHMENT.IMAGE) {
                return <img src={url}
                            className="cursor-pointer imagechat-item"
                            alt=""
                            key={index}
                            onClick={() => { props.toggleOverlay(file.guiId) }}
                        ></img>
            }

            if (file.type === ENUM_KIND_OF_ATTACHMENT.VIDEO) {

            }

            return <div className="view-file-container" key={index}>
                {
                    getIcon(file.name)
                }
                <div className="body-regular view-file-name">
                    <div>
                        <p>
                            { file.name.split('.').shift() }
                        </p>
                        <span>
                            .
                            { file.name.split('.').pop() }
                        </span>
                    </div>

                    <div className="subtitle-regular-2 ">
                        {niceBytes(file.fileSize)}
                    </div>

                </div>
                <div className="view-file-download">
                    <IconDownloadSaveUpload className="img-24 cursor-pointer" onClick={ () => { downloadFile(url) }}></IconDownloadSaveUpload>
                </div>

            </div>

        })
    }


    return (
        <div className={"imagechat-container " + (props.isCurrent ? "imagechat-current" : "")}>
            {
                showImages()
            }
        </div>
    )
}

export default ImageContextChatScreen;