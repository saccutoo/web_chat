import React from 'react';
import { ENUM_KIND_OF_TOASTIFY } from '../../Enum/toastify';
import { IToastify } from './toastify.props';
import { ReactComponent as IconInfor } from '../../Icons/information-infor-line.svg';
import { ReactComponent as IconWarning } from '../../Icons/warning-solid.svg';
import { ReactComponent as IconSucess } from '../../Icons/done-check-solid.svg';
import { ReactComponent as IconError } from '../../Icons/delete-disabled-solid.svg';

const ToastifyMessageScreen = (props: IToastify) =>{
    const getIcon = () =>{
        switch (props.kind) {
            case ENUM_KIND_OF_TOASTIFY.INTRODUCE:
                return <IconInfor></IconInfor>;
            case ENUM_KIND_OF_TOASTIFY.ERROR:
                return <IconError></IconError>;
            case ENUM_KIND_OF_TOASTIFY.SUCCESS:
                return <IconSucess></IconSucess>;
            case ENUM_KIND_OF_TOASTIFY.WARNING:
                return <IconWarning></IconWarning>;

        }
    }

    return (
        <div className="flex-center">
            { getIcon() }
            <span className="margin-8">
                { props.message }
            </span>
        </div>
    
      );
}

export default ToastifyMessageScreen;