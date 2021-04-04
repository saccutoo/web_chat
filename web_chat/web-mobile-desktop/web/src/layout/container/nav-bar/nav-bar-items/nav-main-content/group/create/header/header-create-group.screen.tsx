import React from 'react';
import CustomInputScreen from '../../../../../../../../libraries/Features/custom-input/custom-input.screen';
import GoBackButtonScreen from '../../../../../../../../libraries/Features/goback-button/goback-button.screen';
import IconCirclePanel from '../../../../../../../../libraries/Features/icon-circle-panel/icon-circle-panel.screen';
import { SrcCameraAdd } from '../../../../../../../../libraries/Icons/icon-src';
import { IconCameraAddWhite } from '../../../../../../../../libraries/Icons/icon.screen';

import HeaderCreateGroupAdapter from './header-create-group.adapter';
import { IHeaderCreateGroup } from './header-create-group.props';
import './header-create-group.scss';


const styleCustomInput = {
    padding:'10px 55px 10px 10px',
    borderRadius:'8px',
    fontSize:'14px',
}

function HeaderCreateGroupScreen(props: IHeaderCreateGroup) {

    const  {
        avatarTemp,
        hasHover,
        handleFileSelect
    } = HeaderCreateGroupAdapter(props);

    const { title , setTitle, slogan , setSlogan } = props;

    const srcIcon = avatarTemp.length > 0 ? avatarTemp[0] : SrcCameraAdd;

    return (
        <div className="headercreategroup-container padding-16">

            <GoBackButtonScreen></GoBackButtonScreen>

            <div className="headercreategroup-title padding-16">
                <p className="subheading-semibold">Tạo nhóm trò chuyện</p>
                <div className="headercreategroup-addavatarandname flex-center">
                    <div className="headercreategroup-addedavatar margin-right-8">
                        <IconCirclePanel 
                            icon={ null }
                            srcIcon={ srcIcon } 
                            width="64px" 
                            height="64px" 
                            padding={ avatarTemp.length > 0 ? "" : "1rem" } 
                            class={ "" } 
                            onClick={ handleFileSelect }
                        ></IconCirclePanel>
                        {
                            hasHover && (
                                <div className="headercreategroup-hoveraddedavatar flex-center cursor-pointer" onClick={ handleFileSelect }>
                                    <IconCameraAddWhite></IconCameraAddWhite>
                                </div>
                            )
                        }
                    </div>

                    <div>
                        <CustomInputScreen 
                            placeHolder="Nhập tên nhóm trò chuyện" 
                            class="width-300 margin-8" 
                            style={ styleCustomInput } 
                            isTextArea={ false }
                            isMultiline={ false }
                            hasClearText={ true }
                            value={ title }
                            setValue={ setTitle }
                        ></CustomInputScreen>
                        {/* <CustomInputScreen 
                            placeHolder="Nhập slogan của nhóm" 
                            class="width-100 margin-8" 
                            style={ styleCustomInput } 
                            isTextArea={ false }
                            isMultiline={ false }
                            hasClearText={ true }
                            value={ slogan  }
                            setValue={ setSlogan }
                        ></CustomInputScreen> */}
                    </div>

                    

                </div>
            </div>
            <div></div>
        </div>
    );
}

export default HeaderCreateGroupScreen;
