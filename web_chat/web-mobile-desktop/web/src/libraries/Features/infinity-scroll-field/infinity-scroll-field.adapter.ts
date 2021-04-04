import { useRef } from "react";
import useScroll from "../../Hooks/useScroll";

function InfiniteScrollFieldAdapter(props: any){

    const {page , setPage , isUpdating , totalPages} = props;

    const listRef = useRef<HTMLDivElement>(null);

    const { handleScroll } = useScroll(page , setPage , totalPages , isUpdating , listRef);

    return{
        listRef,
        handleScroll
    }

}

export default InfiniteScrollFieldAdapter;