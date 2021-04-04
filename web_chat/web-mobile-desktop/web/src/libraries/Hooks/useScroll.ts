import { useEffect } from "react";

export default function useScroll(page: number , setPage: any , totalPages: number , isUpdating: boolean , eleRef: any ) {

    const numItemsPerPage = parseInt(process.env.REACT_APP_NUM_ITEMS_PER_PAGE || "10");

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

        const scrollHeight2 = (scrollHeight / (page * numItemsPerPage + 2)) * (page * numItemsPerPage)
        if (scrollHeight2 <= (clientHeight + scrollTop) && page < totalPages && !isUpdating) {
            setPage((prev:number) => prev + 1);
        }
    };

    return {
        handleScroll
    }
}