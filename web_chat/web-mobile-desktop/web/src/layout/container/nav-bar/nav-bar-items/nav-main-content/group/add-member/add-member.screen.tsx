import React from 'react';
import { ENUM_KIND_OF_ICONPANEL } from '../../../../../../../libraries/Enum/icon-panel';
import { ENUM_KIND_OF_STATUS } from '../../../../../../../libraries/Enum/status';
import CircleAvatarScreen from '../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import CustomButtonScreen from '../../../../../../../libraries/Features/custom-button/custom-button.screen';
import CustomInputScreen from '../../../../../../../libraries/Features/custom-input/custom-input.screen';
import { SrcSearchLoupe } from '../../../../../../../libraries/Icons/icon-src';
import { ICompanyMember } from '../../../nav-company-members/company-member/company-member.props';
import InfiniteScrollCompanyMemberListScreen from '../../../nav-company-members/infinite-scroll/infinite-scroll-company-member-list.screen';
import AddMemberAdapter from './add-member.adapter';
import "./add-member.scss";

const styleCustomInput = {
    backgroundImage: `url('${SrcSearchLoupe}')`,
    backgroundPosition: '3% 50%',
    padding: '12px 20px 12px 40px',
    borderRadius: '8px',
    fontSize: '1rem',
}

const loginUserId = localStorage.getItem("userId");

function AddMemberScreen(props: any) {
    const { memberInGroup } = props;

    const {
        hasFooter,
        setSelectedUserByCheckbox,
        selectedUserList, setSelectedUser,
        removeSelectedUser,
        textSearch, setTextSearch, changeSearch,
        companyMemList, setCompanyMemList,
        addMember
    } = AddMemberAdapter(props);

    const iconpanel = ENUM_KIND_OF_ICONPANEL.CREATE_GROUP;

    const showSelectedUserPanel = (memberList: ICompanyMember[]) => {
        const length = memberList.length
        if (length > 0) {
            return memberList.map((member: ICompanyMember, index: number) => {
                if (member.id !== loginUserId && !memberInGroup.some((item: any) => item.user?.id === member.id))
                    return <div key={index}>
                        <div className="bodycreategroup-main-body-selecteduserpanel cursor-pointer" onClick={() => { setSelectedUser(member.id) }}>
                            <CircleAvatarScreen
                                src={member.avatar}
                                isOnline={member.status === ENUM_KIND_OF_STATUS.ACTIVE}
                                class="img-48"
                                width=""
                                height=""
                                hasCursor={true}
                            ></CircleAvatarScreen>
                            <p>
                                {member.lastName + " " + member.firstName}
                            </p>
                            <input className="bodycreategroup-main-body-checkbox position-abs"
                                type="checkbox" name={member.id}
                                onChange={setSelectedUserByCheckbox}
                                checked={selectedUserList?.some((id: string) => id === member.id)} ></input>

                        </div>
                        <div className="bodycreategroup-main-body-separate"></div>
                    </div>
            })
        }
    }

    return (
        <div className={"addmember-container " + (hasFooter ? "addmember-container--hasfooter" : "")}>
            <div className={"addmember-selectedmember " + (hasFooter ? " addmember-selectedmember--hasfooter" : "")} >
                <CustomInputScreen
                    style={styleCustomInput}
                    hasClearText={true}
                    placeHolder="Nhập tên người cần tìm kiếm"
                    class=""
                    isMultiline={false}
                    isTextArea={false}
                    onChange={changeSearch}
                ></CustomInputScreen>

                <div className="addmember-selectedmember-main">
                    <InfiniteScrollCompanyMemberListScreen
                        className={"bodycreategroup-main-body-selecteduser"}
                        showCompanyMemberList={showSelectedUserPanel}
                        iconpanel={iconpanel}
                        setCompanyMemList={setCompanyMemList}
                        textSearch={textSearch}
                    ></InfiniteScrollCompanyMemberListScreen>
                </div>
            </div>
            {
                hasFooter && (
                    <div className="addmember-footer">
                        <div className="addmember-footer-selectedmember">
                            {
                                selectedUserList.map((id: string, index: number) => <CircleAvatarScreen src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                                    isOnline={false}
                                    canRomove={true}
                                    class=""
                                    width="42px"
                                    height="42px"
                                    onRemove={() => { removeSelectedUser(id) }}
                                    key={index}
                                ></CircleAvatarScreen>)
                            }
                        </div>
                        <CustomButtonScreen text="Thêm" onClick={addMember} class="primary"></CustomButtonScreen>
                    </div>
                )
            }
        </div>
    );
}

export default AddMemberScreen;
