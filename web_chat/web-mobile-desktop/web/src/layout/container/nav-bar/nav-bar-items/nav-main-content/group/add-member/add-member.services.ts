import { post } from "../../../../../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../../../../../helpers/networking/url-paths";

function AddMemberServices(){
    let instance: any;

    function init() {
        return {
            // Lấy danh sách chat trong phần popup chia sẻ
            addMember: async (data: any) => {
                const response = await post(
                    URL_PATHS.ADD_MEMBER,
                    data,
                    true
                );
                return response
            },
        }
    }

    return {
        getInstance: () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default AddMemberServices;