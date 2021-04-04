import { useEffect } from "react";

export default function useScrollChatList(page: number , setPage: any , totalPages: number , isUpdating: boolean , eleRef: any , indexRecord: number , setScrollDownIsDisplayed: any ) {

    useEffect(() => {
        if(eleRef.current){
            const clientHeightItems = eleRef.current.children[0]?.clientHeight - 40;
            const clientHeight = eleRef.current.clientHeight;

            if(clientHeight > clientHeightItems && page < totalPages && !isUpdating){
                setPage((prev:number) => prev + 1);
            }
        }
    })

    const handleScroll = (event: any) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

        if(indexRecord === 0){
            if(scrollHeight - (scrollTop + clientHeight) > clientHeight){
                setScrollDownIsDisplayed(true)
            }else{
                setScrollDownIsDisplayed(false)
            }
        }

        setTimeout(() => {
            if (scrollTop === 0 && page < totalPages && !isUpdating ) {
                setPage((prev:number) => prev + 1);
            }
        } , 1e3)
    };

    return {
        handleScroll
    }
}