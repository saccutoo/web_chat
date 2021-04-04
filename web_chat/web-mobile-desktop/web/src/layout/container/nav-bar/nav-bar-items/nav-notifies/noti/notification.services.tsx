import { fetch } from "../../../../../../helpers/api/api-helper";
function NotificationServices(){
    let instance: any;

    function init() {
        return {
            getNotificationList : async (url:string , page: number , pageSize: number , userId: string) => {
                const params ={
                    page: page,
                    pageSize: pageSize,
                    userId: userId
                }

                return await fetch(url, params, true)
            },
            // changeStatusAllNotification : async (url:string ,id:string) => {
            //     const params ={
            //         id: id
            //     }
            //     return await fetch(url, params, true)
            // }
        }
    };
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default NotificationServices;
