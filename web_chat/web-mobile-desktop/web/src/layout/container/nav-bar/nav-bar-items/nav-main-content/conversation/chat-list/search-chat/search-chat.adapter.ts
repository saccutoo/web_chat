import { useCallback, useEffect, useState } from "react";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../../libraries/Enum/status-code";
import debounce from "../../../../../../../../libraries/Functions/debounce";
import useIdInPath from "../../../../../../../../libraries/Hooks/useIdInPath";
import { ISearchMessage } from "../../main/conversation.props";
import SearchChatServices from "./search-chat.services";

const SearchChatAdapter = (props: any) => {
    // state
    const [messageList, setMessageList] = useState<ISearchMessage[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages , setTotalPages] = useState<number>(1);
    const [isUpdating , setIsUpdating] = useState<boolean>(true);

    const { query , setIndexRecord , setPageInChatList , setMessageInChatList , onSearch } = props;

    const roomId = useIdInPath();

    const verify = useCallback(
        debounce(async (textSearch: any) => {
            if(textSearch) {
                setIsUpdating(true)

                const pageSize = process.env.REACT_APP_NUM_ITEMS_PER_PAGE
                const response = await SearchChatServices.getInstance().getListSearchMessage(roomId, textSearch , page , pageSize);
                if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                    const dataSearch = response.data;
                    if (dataSearch && dataSearch.length > 0) {
                        setMessageList((prev:any) => [...prev , ...dataSearch]);
                        setTotalPages(response.totalPages)
                    } else{
                        setMessageList([]);
                    }
                }

                setIsUpdating(false)

            } else{
                setMessageList([]);
            }
        }, 3e2
    ), []);


    useEffect(() => {

        if (query !== "") {
            verify(query);
        }

        setPage(1);
        setMessageList([]);
        setTotalPages(1)

    } , [query])


    const createMarkup = (html: any) => {
        return { __html: html }
    }

    const handleScrollToMessage = async (messId : string) => {
        
        setIsUpdating(true)

        const pageSize = process.env.REACT_APP_NUM_ITEMS_PER_PAGE
        const response = await SearchChatServices.getInstance().getPageByMessage(roomId, messId , pageSize);
        if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
            setIndexRecord(response.idxRecord)  
            setMessageInChatList([])  
            setPageInChatList(response.currentPage)
            onSearch()
        }

        setIsUpdating(false)
    }
    

    return {
        messageList, 
        createMarkup,
        totalPages ,
        isUpdating ,
        page, setPage,
        handleScrollToMessage
    }
}

export default SearchChatAdapter;
