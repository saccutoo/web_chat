import { IConversationDatabase, conversationDatabase } from './../../sampledatabase/Conversion.database';
import { IMessageDatabase, instanceOfMessageDatabase, messageDatabase } from '../../sampledatabase/Message.database';
import { IUserDatabase, userDatabase } from '../../sampledatabase/User.database';
import { GET_CONVERSATIONLIST } from '../Types/ConversationList.type';
import { groupDatabase, IGroupDatabase } from './../../sampledatabase/Group.database';

export interface IConversationState{
    id:number,
    avatar:string,
    name:string,
    isOnline:boolean,
    lastMess:string,
    hasReadLastMess:boolean,
    isGroup:boolean,
    timeToReadLastMess:string,
    isActive:boolean,
    setIsActive:any
}

const INITIAL_STATE: any[] = [];


const conversationListReducer = (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
        case GET_CONVERSATIONLIST:
            let conversations = state;

            const userIdz = action.payload.userId;

            const groupListInDb: IGroupDatabase[] = groupDatabase.filter((group: IGroupDatabase) =>{
                if(group.userIdList.some((userId:number) => userId === userIdz)){
                    return group;
                }
            }) || [];

            if(groupListInDb.length > 0){
                let tempConversations = groupListInDb.map((group: IGroupDatabase) =>{
                    const lastMess = messageDatabase.find((message: IMessageDatabase) => message.id === group.messageIdList[group.messageIdList.length - 1]);
                    
                    if(instanceOfMessageDatabase(lastMess)){
                        const lastMessContext = lastMess?.context || "";
                        const hasReadLastMess = lastMess.userHasReadList.some((id: number) => id === userIdz);

                        let tempConversation: IConversationState ={
                            id: group.id,
                            name: group.name,
                            isOnline: group.userIdList.some((userId: number) => {
                                const user = userDatabase.find((user: IUserDatabase) => user.id === userId);
                                if(user?.isOnline){
                                    return true;
                                }
                            }),
                            isGroup: true,
                            lastMess: lastMessContext,
                            hasReadLastMess: hasReadLastMess,
                            avatar: group.avatar,
                            timeToReadLastMess:lastMess.datetime,
                            isActive:false,
                            setIsActive: null
                        }
                        return tempConversation;
                    }

                }) || [];

                if(tempConversations.length > 0){
                    conversations = [...conversations ,...tempConversations];
                }
            }

            const coversationListInDb: IConversationDatabase[] = conversationDatabase.filter((conversation: IConversationDatabase) =>{
                if(conversation.userIdList.some((userId: number) => userId === userIdz)){
                    return conversation
                }
            }) || [];

            if(coversationListInDb.length > 0){
                let tempConversations = coversationListInDb.map((conversation: IConversationDatabase) =>{
                    const lastMess = messageDatabase.find((message: IMessageDatabase) => message.id === conversation.messageIdList[conversation.messageIdList.length - 1]);
                    
                    if(instanceOfMessageDatabase(lastMess)){
                        const lastMessContext = lastMess?.context || "";
                        const hasReadLastMess = lastMess.userHasReadList.some((id: number) => id === userIdz);
                        const idxCurrentUser = conversation.userIdList.indexOf(userIdz);
                        const restUserId = conversation.userIdList[idxCurrentUser === 0 ? 1 : 0];
                        const restUser: any = userDatabase.find((user: IUserDatabase) => user.id === restUserId);

                        let tempConversation: IConversationState ={
                            id: conversation.id,
                            name: restUser.name,
                            isOnline: conversation.userIdList.some((userId: number) => {
                                const user = userDatabase.find((user: IUserDatabase) => user.id === userId);
                                if(user?.isOnline){
                                    return true;
                                }
                            }),
                            isGroup: false,
                            lastMess: lastMessContext,
                            hasReadLastMess: hasReadLastMess,
                            avatar: restUser.avatar,
                            timeToReadLastMess:lastMess.datetime,
                            isActive:false,
                            setIsActive:null
                        }
                        return tempConversation;
                    }
                }) || [];

                if(tempConversations.length > 0){
                    conversations = [...conversations ,...tempConversations];
                }
            }
            // conversations[0].isActive = true;

            return conversations;

        default: 
            return state;
    }
};

export default conversationListReducer;