import { ACTIVE_RESPONSEMESS , UNACTIVE_RESPONSEMESS } from '../Types/ResponseMess.type';


export const setResponseMess = (name: string , context: string , kindOfMess: number) => {
    return {
        type: ACTIVE_RESPONSEMESS,
        payload: {
            name:name,
            context:context,
            kindOfMess:kindOfMess
        }
    };
};

export const unactiveResponseMess = () => {
    return {
        type: UNACTIVE_RESPONSEMESS,
    };
};
