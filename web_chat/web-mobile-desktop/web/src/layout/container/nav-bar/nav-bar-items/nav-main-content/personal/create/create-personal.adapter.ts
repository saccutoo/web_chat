import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../libraries/Enum/status-code";
import debounce from "../../../../../../../libraries/Functions/debounce";
import { ICompanyMember } from "../../../nav-company-members/company-member/company-member.props";
import CreatePersonalService from "./create-personal.services";

const WAIT_INTERVAL = 500;

function CreatePersonalAdapter(){
    // State
    const [companyMemberList, setCompanyMemberList] = useState<ICompanyMember[]>([]);
    const [textSearch, setTextSearch] = useState("");

    const history = useHistory();

    /*
    * created by tuda
    * user debounce to wait 1s call back call api
    */
    // useEffect(() => {
    //     if (textSearch || textSearch !== "") {
    //         verify(textSearch);
    //     }
    // }, [textSearch]);

    // const verify = useCallback(
    //     debounce(async (textSearch: any) => {
    //         const response = await CreatePersonalService.getInstance().getCompanyMemberListSearch(textSearch);
    //         if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
    //             setCompanyMemberList([...response.data.user]);
    //         }
    //     }, WAIT_INTERVAL
    // ), []);

    const changeSearch = async (event: any) => {
        setTextSearch(event.target.value)
    }

    /*
    * created by tuda
    * redirect to group chat if exist else redirect to group memberId
    */
    const createChatRoom = async (memberId: string) => {
        const loginId = localStorage.getItem("userId");
        const userIdList = {
            userIdList: [loginId, memberId]
        }
        const response = await CreatePersonalService.getInstance().getSingleRoom(userIdList);
        if (response && response.data !== null) {
            history.push("/g/" + response.data.id);
        } else {
            history.push("/g/" + memberId);
        }
    }

    return { 
        createChatRoom, 
        changeSearch , 
        textSearch 
    };
}

export default CreatePersonalAdapter;
