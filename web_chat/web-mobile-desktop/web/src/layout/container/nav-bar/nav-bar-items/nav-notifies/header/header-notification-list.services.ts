import { post } from "../../../../../../helpers/api/api-helper";
function HeaderNotificationListServices(){
    let instance: any;
    //call api cập nhật đọc tất cả
    function init() {
        return {
            changeStatusAllNotification : async (url:string ,userId:string,isRead:boolean) => {
                const params ={
                    userId: userId,
                    isRead:isRead
                }
                return await post(url, params, true)
            },
        }
    };
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
    
}

export default HeaderNotificationListServices;
