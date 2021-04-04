import React from 'react';
import { ENUM_KIND_OF_ICONPANEL } from '../../../../../../libraries/Enum/icon-panel';
import CustomInputScreen from '../../../../../../libraries/Features/custom-input/custom-input.screen';
import { SrcSearchLoupe } from '../../../../../../libraries/Icons/icon-src';
import { ICompanyMember } from '../company-member/company-member.props';
import CompanyMemberScreen from '../company-member/company-member.screen';
import InfiniteScrollCompanyMemberListScreen from '../infinite-scroll/infinite-scroll-company-member-list.screen';
import FriendListAdapter from './company-member-list.adapter';

import './company-member-list.scss';


const styleCustomInput = {
    backgroundImage: `url('${SrcSearchLoupe}')`,
    backgroundPosition: "3% 50%",
    padding: "12px 20px 12px 40px",
    borderRadius: "8px",
    fontSize: "1rem",
};

function CompanyMemberListScreen() {

    const {
        query, setQuery,
        searchCompanyMemberList,
        hasSearch, setHasSearch,
        onChange,
        redirectToChatDetail
    } = FriendListAdapter()

    const iconpanel = ENUM_KIND_OF_ICONPANEL.COMPANYMEMBER

    const showCompanyMemberList = (companyMember: ICompanyMember[]) => {
        if (companyMember) {
            return companyMember.map(
                (companyMember: ICompanyMember, idx: number) => (
                    <CompanyMemberScreen
                        key={idx}
                        {...companyMember}
                        onClick={() => { redirectToChatDetail(companyMember.id) }}
                    ></CompanyMemberScreen>
                )
            );
        }
        return <></>
    }

    return (
        <>
            <div className="descriptionchatlist-top">
                <div className="descriptionchatlist-header-container">
                    <p className="subheading-semibold">Thành viên</p>
                </div>

                <CustomInputScreen
                    style={styleCustomInput}
                    class="searchinput-container"
                    placeHolder="Nhập thành viên cần tìm kiếm"
                    id={"searchfield-container-index"}
                    isMultiline={false}
                    isTextArea={false}
                    hasClearText={true}
                    value={query}
                    onChange={onChange}
                    onClick={() => { setHasSearch(true) }}
                    setValue={setQuery}
                ></CustomInputScreen>
            </div>


            <InfiniteScrollCompanyMemberListScreen
                className={"descriptionchatlist-bottom"}
                showCompanyMemberList={showCompanyMemberList}
                iconpanel={iconpanel}
                textSearch={query}
            ></InfiniteScrollCompanyMemberListScreen>

        </>
    );

}

export default CompanyMemberListScreen;


