import { useEffect, useState } from "react";
import { ENUM_KIND_OF_STATUS_CODE } from "../../Enum/status-code";
import useIdInPath from "../../Hooks/useIdInPath";
import useKeyDown from "../../Hooks/useKeyDown";
import { IMiniImage } from "./image-overlay-full.props";
import ImageOverlayServices from "./image-overlay-full.services";

function ImageOverlayAdapter (props: any) {
    const [amountOfMiniImages, setAmountOfMiniImages] = useState<number>(15);
    const [page, setPage] = useState<number>(1);
    const [mainImage, setMainImage] = useState<IMiniImage>()
    const [miniImages, setMiniImages] = useState<IMiniImage[]>([])

    const {  mainSrcImage , close , miniImageList } = props;

    const roomId = useIdInPath()

    const windowWidth = window.innerWidth;

    useEffect(() => {
        const getData = async () => {
            if(miniImageList){
                if(miniImageList.length > 0){
                    const miniImagesTemp = miniImageList.map((miniImage:any , index:number) => {
                        const image:IMiniImage ={
                            id: miniImage.id,
                            srcImage: miniImage.guiId,
                            userName: miniImage.chat.user.userName,
                            index:index + 1,
                            createdAt: miniImage.createdAt
                        }

                        return image;
                    })
            
                    setMiniImages(miniImagesTemp);
                }
                return;
            }
            const response = await ImageOverlayServices.getInstance().getAttachmentImage(roomId , page , amountOfMiniImages);
            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                const result = response.data;
                if(result.length > 0){
                    const miniImagesTemp = result.map((miniImage:any , index:number) => {
                        const image:IMiniImage ={
                            id: miniImage.id,
                            srcImage: miniImage.guiId,
                            userName: miniImage.chat.user.userName,
                            index:index + 1,
                            createdAt: miniImage.createdAt
                        }
            
                        return image;
                    })
            
                    setMiniImages(miniImagesTemp);
                }
            }
        }

        getData();  
    }, [setMiniImages, roomId , amountOfMiniImages , page])

    useEffect(() => {
        if(mainSrcImage && !mainImage){
            const mainImageTemp = miniImages.find((miniImage:any) => miniImage.srcImage === mainSrcImage)
            mainImageTemp && setMainImage(mainImageTemp);      
        }

    }, [ mainSrcImage , setMainImage , miniImages , mainImage ])

    useEffect(() => {  
        setAmountMiniImagesByScreen();
    }, [])

    // useEffect(() => {
    //     const windowWidth = window.innerWidth;
    //     if (windowWidth <= 1024) {
    //         mainMiniImage.index > amountOfMiniImages && setPage(Math.floor(mainMiniImage.index / amountOfMiniImages) + 1)
    //     } else {
    //         mainMiniImage.index > amountOfMiniImages && setPage(Math.floor(mainMiniImage.index / amountOfMiniImages) + 1)
    //     }
    // }, [setAmountOfMiniImages, amountOfMiniImages, setPage, mainSrcImage])

    useEffect(() => {
        window.addEventListener('resize', setAmountMiniImagesByScreen);

        return () => window.removeEventListener('resize', setAmountMiniImagesByScreen);
    }, [])

    const setAmountMiniImagesByScreen = () => {
        if (windowWidth <= 1024) {
            setAmountOfMiniImages(5)
        } else {
            setAmountOfMiniImages(15)
        }
    }

    const closeImageOverlayByEscKey = (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
            close()
        }
    }

    useKeyDown(closeImageOverlayByEscKey)

    const setMiniImageByKeyBoardEvent = (e: KeyboardEvent) => {
        if (e.keyCode === 37) {
            setMainImageByArrow(true)
        } else if (e.keyCode === 39) {
            setMainImageByArrow(false)
        }
    }

    useKeyDown(setMiniImageByKeyBoardEvent)

    const setMainImageByArrow = (isPrev: boolean) => {
        const oldIndex = mainImage?.index;
        if(!oldIndex){
            return
        }

        let newIndex = oldIndex + 1
        let newPage = page;
        
        if(isPrev) {
            newIndex = oldIndex - 1;
            if(newIndex === 0){
                return;
            }

            if(newIndex === ((page - 1) * amountOfMiniImages)){
                newPage = newPage - 1
            }
        } else{
            if(newIndex > (page * amountOfMiniImages)){
                newPage = newPage + 1
            }
        }

        if(newPage !== page){
            setPage(newPage)
        }


        const mainImageTemp = miniImages.find((miniImage:any) => miniImage.index === newIndex)
        mainImageTemp && setMainImage(mainImageTemp);  

    }

    return {
        miniImages,
        mainImage,
        amountOfMiniImages,
        close,
        page,
        setMainImage,
        setMainImageByArrow
    }
}

export default ImageOverlayAdapter;
