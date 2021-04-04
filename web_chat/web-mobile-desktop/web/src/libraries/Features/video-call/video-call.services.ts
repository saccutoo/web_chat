import { IChat } from "../../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/main/conversation.props"
import { URL_PATHS } from '../../../helpers/networking/url-paths';
import { post } from "../../../helpers/api/api-helper";

const videoCallServices = () => {

    const sendMessage = async (message: IChat) => {
        // return axios({
        //     method: "POST",
        //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.POST_PUSH_STREAM_VIDEO_CALL}`,
        //     headers: {
        //         "content-type": 'application/json',
        //     },
        //     data: message,
        //     timeout: 30000
        // })
        //     .then((res) => res)
        //     .catch((err) => err)

        return await post (
            URL_PATHS.POST_PUSH_STREAM_VIDEO_CALL,
            message,
            true
        )

    }


    const getUserById = async (userId: any) => {
        // return axios({
        //     method: "POST",
        //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.POST_GET_USER_BY_ID}`,
        //     headers: {
        //         "content-type": 'application/json',
        //     },
        //     data: {
        //         "text":userId
        //     },
        //     timeout: 30000
        // })
        //     .then((res) => res)
        //     .catch((err) => err)

        const data = {
            text:userId
        }

        return await post (
            URL_PATHS.POST_GET_USER_BY_ID,
            data,
            true
        )
    }
    
    const sendMessageVideo = async (message: IChat) => {
        // return axios({
        //     method: "POST",
        //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.POST_CREATE_MESSGAE_STATUS_VIDEO_CALL}`,
        //     headers: {
        //         "content-type": 'application/json',
        //     },
        //     data: message,
        //     timeout: 30000
        // })
        //     .then((res) => res)
        //     .catch((err) => err)

        return await post (
            URL_PATHS.POST_CREATE_MESSGAE_STATUS_VIDEO_CALL,
            message,
            true
        )
    }

    return {
        sendMessage,
        getUserById,
        sendMessageVideo        
    }
}

export default videoCallServices