import { ENUM_KIND_OF_TOASTIFY } from "../../Enum/toastify";

import { toast } from 'react-toastify';
import ToastifyMessageScreen from "./toastify-message.screen";

const ToastifyAdapter = () =>{

    const info = (message: string) => {
        const Message = ToastifyMessageScreen({
            kind:ENUM_KIND_OF_TOASTIFY.INTRODUCE,
            message
        });
        toast.info(Message);
    }

    const success = (message: string) => {
        const Message = ToastifyMessageScreen({
            kind:ENUM_KIND_OF_TOASTIFY.SUCCESS,
            message
        });
        toast.success(Message);
    }

    const warning = (message: string) => {
        const Message = ToastifyMessageScreen({
            kind:ENUM_KIND_OF_TOASTIFY.WARNING,
            message
        });
        toast.warn(Message);
    }

    const error = (message: string) => {
        const Message = ToastifyMessageScreen({
            kind:ENUM_KIND_OF_TOASTIFY.ERROR,
            message
        });
        toast.error(Message);
    }

    return { 
        info,
        success,
        warning,
        error
    }
}

export default ToastifyAdapter;