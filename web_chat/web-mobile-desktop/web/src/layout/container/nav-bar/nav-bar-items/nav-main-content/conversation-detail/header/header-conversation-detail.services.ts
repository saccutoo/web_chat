import { URL_PATHS } from "../../../../../../../helpers/networking/url-paths";
import { post , fetch } from "../../../../../../../helpers/api/api-helper";

function HeaderConversationDetailServices(){
    let instance: any;

    function init() {

        return {
            getRoomChatById: async (id: any) => {
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
}

export default HeaderConversationDetailServices;