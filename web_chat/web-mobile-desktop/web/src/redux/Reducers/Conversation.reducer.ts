import { SHOW_CONVERSATION } from './../Types/Conversation.type';

interface IResponseMess{
    isActive:boolean,
    name:string,
    context:string,
    kindOfMess:number
}

const INITIAL_STATE: IResponseMess = {
    isActive:false,
    name:'',
    context:'',
    kindOfMess:0,
};

const conversationReducer = (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
        case SHOW_CONVERSATION:
            return {
                ...state,
                isActive:true,
                name:action.payload.name,
                context:action.payload.context,
                kindOfMess:action.payload.kindOfMess,
            };

        default: 
            return state;
    }
};

export default conversationReducer;