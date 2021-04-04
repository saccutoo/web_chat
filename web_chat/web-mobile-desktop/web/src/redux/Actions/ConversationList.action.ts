import { GET_CONVERSATIONLIST } from './../Types/ConversationList.type';


export const getConversationList = (userId: number) => {
    return {
        type: GET_CONVERSATIONLIST,
        payload: {
            userId:userId
        }
    };
};


