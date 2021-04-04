import { GET_CURRENTUSER } from './../Types/CurrentUser.type';


export const getCurrentUser = (id: number) => {
    return {
        type: GET_CURRENTUSER,
        payload: {
            id:id
        }
    };
};


