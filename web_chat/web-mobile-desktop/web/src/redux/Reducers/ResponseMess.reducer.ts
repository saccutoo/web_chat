import { IResponseMess } from '../Models/ResponseMess.model';
import { ACTIVE_RESPONSEMESS , UNACTIVE_RESPONSEMESS } from '../Types/ResponseMess.type';

const INITIAL_STATE: IResponseMess = {
    isActive:false,
    name:'',
    context:'',
    kindOfMess:0,
};

const responseMessReducer = (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
        case ACTIVE_RESPONSEMESS:
            return {
                ...state,
                isActive:true,
                name:action.payload.name,
                context:action.payload.context,
                kindOfMess:action.payload.kindOfMess,
            };
        case UNACTIVE_RESPONSEMESS:
            return {
                ...state,
                isActive:false
            };

        default: 
            return state;

    }

};

export default responseMessReducer;