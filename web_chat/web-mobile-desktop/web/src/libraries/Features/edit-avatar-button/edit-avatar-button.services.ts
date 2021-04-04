import { post , fetch } from "../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../helpers/networking/url-paths";

const EditAvatarButtonServices = (() => {
    let instance: any;

    function init() {

        return {

            updateAvatar: async (data: any) => {
                // return axios({
                //     method:"POST",
                //     url:`${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.POST_UPDATE_AVATAR}`,
                //     headers: {
                //         "content-type": 'application/json',
                //     },
                //     data: data,
                //     timeout:30000  
                // })
                // .then((res)=> res)
                // .catch((err) => console.log(err))

                return await post(
                    URL_PATHS.POST_UPDATE_AVATAR,
                    data,
                    true
                )
            },

            getRoomChatById: async (id: any) => {
                // return axios({
                //     method:"GET",
                //     url:`${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_CHATROOMDETAIL}/?id=${id}`,
                //     timeout:30000  
                // })
                // .then((res)=> res)
                // .catch((err) => err)

                const url = `${URL_PATHS.GET_CHATROOMDETAIL}/?id=${id}`;

                return await fetch(
                    url,
                    null,
                    true
                )
            }
        }
    };
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
})()

export default EditAvatarButtonServices;

