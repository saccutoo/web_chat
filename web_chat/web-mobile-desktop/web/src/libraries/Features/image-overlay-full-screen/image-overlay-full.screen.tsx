import moment from 'moment';
import React from 'react';
import downloadFile from '../../Functions/download-file';
import getApiUrl from '../../Functions/get-api-url';
import { getDayByTime } from '../../Functions/get-time-period-between-times';
import { IconArrowLeft, IconArrowRight, IconDeleteDisabledLine, IconDownloadSaveUpload, IconDownloadSaveUploadImage } from '../../Icons/icon.screen';
import CircleAvatarScreen from '../circle-avtar/circle-avatar.screen';
import ImageOverlayAdapter from './image-overlay-full.adapter';
import { IMiniImage } from './image-overlay-full.props';
import './image-overlay-full.scss';

function ImageOverlayScreen(props: any) {

    const {
        miniImages,
        mainImage,
        amountOfMiniImages,
        close,
        page,
        setMainImage,
        setMainImageByArrow
    } = ImageOverlayAdapter(props);


    const srcMainImage = mainImage?.srcImage ? mainImage.srcImage : ""
    console.log(mainImage)
    return (
        <div className="imageoverlay-container">
            <div className="imageoverlay-nameauthor">
                {
                    mainImage?.userName && (
                        <>
                            <div className="avatar-detail-image">
                                <CircleAvatarScreen
                                    isOnline={false}
                                    src={"https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"}
                                    class=""
                                    width="32px"
                                    height="32px"
                                ></CircleAvatarScreen>
                            </div>
                            <h4 className="imageoverlay-nameauthor-name">
                                {
                                    mainImage.userName
                                }
                            </h4>
                            <div className="imageoverlay-nameauthor-datetime">
                                {
                                    mainImage.createdAt && (moment(mainImage.createdAt).format("HH:mm") + " " + getDayByTime(new Date(mainImage.createdAt)))
                                }
                            </div>
                        </>
                    )
                }
            </div>
            <IconDeleteDisabledLine className="imageoverlay-cancel" onClick={close}></IconDeleteDisabledLine>
            <IconDownloadSaveUploadImage className="imageoverlay-download" onClick={() => { downloadFile(getApiUrl(srcMainImage)) }}></IconDownloadSaveUploadImage>

            {
                (mainImage && mainImage?.index > 1) && (
                    <div className="imageoverlay-leftarrow imageoverlay-arrow" onClick={() => { setMainImageByArrow(true) }}>
                        <IconArrowLeft></IconArrowLeft>
                        <div></div>
                    </div>
                )
            }
            {
                (mainImage && mainImage?.index < miniImages.length) && (
                    <div className="imageoverlay-rightarrow imageoverlay-arrow" onClick={() => { setMainImageByArrow(false) }}>
                        <IconArrowRight></IconArrowRight>
                        <div></div>
                    </div>
                )
            }

            <img alt="" className="imageoverlay-mainimage" src={getApiUrl(srcMainImage)}></img>

            <div className="imageoverlay-miniimages">
                {
                    miniImages.map((miniImage: IMiniImage, index: number) => (
                        (index + 1 > (page - 1) * amountOfMiniImages && index + 1 <= page * amountOfMiniImages) &&
                        <img
                            alt=""
                            src={miniImage?.srcImage && getApiUrl(miniImage.srcImage)}
                            key={index}
                            onClick={() => { setMainImage(miniImage) }}
                            className={miniImage.index === mainImage?.index ? "imageoverlay-miniimage--active" : ""}
                        ></img>
                    ))
                }
            </div>
        </div>
    );
}

export default ImageOverlayScreen;
