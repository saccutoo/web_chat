import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../../App";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../libraries/Enum/status-code";
import debounce from "../../../../../../libraries/Functions/debounce";
import CreateGroupService from "../../nav-main-content/group/create/main/create-group.services";
import { ICompanyMember } from "../company-member/company-member.props";

import { IInfiniteScrollCompanyMemberList } from "./infinite-scroll-company-member-list.props";
import CompanyMemberListServices from "./infinite-scroll-company-member-list.services";

const WAIT_INTERVAL = 3e2;

function InfiniteScrollCompanyMemberListAdapter(props: IInfiniteScrollCompanyMemberList) {
    // state
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [companyMemberList, setCompanyMemberList] = useState<ICompanyMember[]>([]);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const { setCompanyMemList, textSearch } = props;

    const user = useContext(UserContext);
    
    useEffect(() => {
        const getData = async () => {
            setIsUpdating(true);

            if (textSearch === "") {
                const response = await CompanyMemberListServices().getInstance().getCompanyMemberList(page);
                if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    setTotalPages(response.totalPages);
                    // updated by tuda, filter user login
                    if (localStorage.getItem("userId")) {
                        const listTemp = response.data.filter((item: any) => item.id !== localStorage.getItem("userId"))
                        setCompanyMemberList((prev) => [...prev, ...listTemp]);

                        if (setCompanyMemList) {
                            setCompanyMemList((prev: any) => [...prev, ...listTemp]);
                        }

                    }
                }
            }

            setIsUpdating(false);
        };

        getData();
    }, [page, textSearch, user]);

    /*
    * created by tuda
    * user debounce to wait 1s call back call api
    */
    useEffect(() => {
        verify(textSearch);
    }, [textSearch]);

    const verify = useCallback(
        debounce(async (textSearch: any) => {
            let data = {
                text: textSearch,
                page: page
            };
            const response = await CreateGroupService.getInstance().getCompanyMemberListSearch(data);
            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                // updated by tuda, filter user login
                let loginUserId = localStorage.getItem("userId");
                if (loginUserId) {
                    const listTemp = response.data.filter((item: any) => item.id !== loginUserId)
                    setCompanyMemberList([...listTemp]);
                }
            }
        }, WAIT_INTERVAL
        ), []);

    return {
        companyMemberList,
        totalPages,
        page, setPage,
        isUpdating
    }
}


export default InfiniteScrollCompanyMemberListAdapter;

