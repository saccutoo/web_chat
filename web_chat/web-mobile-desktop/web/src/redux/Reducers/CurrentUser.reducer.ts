import { userDatabase } from './../../sampledatabase/User.database';
import { IUser } from "../Models/User.model";
import { GET_CURRENTUSER } from "../Types/CurrentUser.type";


const INITIAL_STATE: IUser = {
    id:-1,
    name:"",
    avatar:"",
    isOnline: true,
    description:""
};

const currentUserReducer = (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
        case GET_CURRENTUSER:
            const id = action.payload.id;
            const user = userDatabase.find((user:IUser) => user.id === id);
            return {
                ...user
            };

        default: 
            return state;

    }

};

export default currentUserReducer;