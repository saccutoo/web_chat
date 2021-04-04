import { put } from "../../../../../../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../../../../../../helpers/networking/url-paths";
import { IChat } from "../../main/conversation.props";

const GuestChatServices = (() => {
    let instance: any;

    function init() {
        return {
            updateMessage: async (data: IChat) => {
                // return axios({
                //     method: "PUT",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.PUT_UPDATE_MESSAGE}`,
                //     headers: {
                //         "content-type": 'application/json',
                //     },
                //     data: message,
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))

                return await put(
                    URL_PATHS.PUT_UPDATE_MESSAGE,
                    data,
                    true
                )
            },

        }
    }
    return {

        getInstance: () => {
            if (!instance) instance = init();
            return instance;
        }
    }
})();

export default GuestChatServices;