import { post, postFile, fetch } from "../../../../../../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../../../../../../helpers/networking/url-paths";

const CreateGroupService = (() => {
    let instance: any;

    function init() {

        return {
            createGroup : async (formData: FormData) => {
                return await postFile(
                    URL_PATHS.POST_CHATROOM,
                    formData,
                    true
                )
                 
                // return await axios({
                //     method:"POST",
                //     url:`${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.POST_CHATROOM}`,
                //     headers: { 
                //         "content-type": 'multipart/form-data',
                //     },
                //     data: formData,
                //     timeout:30000  
                // })
                // .then((res)=> res)
                // .catch((err) => console.log(err))
            },

            getCompanyMemberListSearch: async (data: any) => {
                // const response =  await axios({
                //     method: "POST",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_COMPANYMEMBERLIST_SEARCH}`,
                //     data: {
                //         text: text
                //     }
                // })
                // .then((res)=>  res)
                // .catch((err) => console.log(err))

                // return response;

                return await fetch(
                    URL_PATHS.GET_COMPANYMEMBERLIST_BYQUERY,
                    data,
                    true
                );
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

export default CreateGroupService;

