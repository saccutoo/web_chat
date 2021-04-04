import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { APP_CONFIGS } from "../../helpers/api/app-config";
import HeaderServices from "./header.services";

function HeaderAdapter(props?: any) {
    const user = useContext(UserContext);
    const [userInfo, setUserInfo] = useState<any>();
    const [userLogin, setUserLogin] = useState<any>();

    // useEffect(() => {
        // const userLogin = localStorage.getItem("loginUser");
        // if (userLogin) {
        //     let userInfo = JSON.parse(userLogin);
        //     setUserLogin(userInfo)
        // }
    // }, []);

    useEffect(() => {
        const getUserInfo = async () => {
            // if (user){
            //     let userReq = {
            //         text: user.id
            //     }
            //     const response = await HeaderServices().getInstance().getDetail(userReq);
            //     if(response){
            //         setUserInfo(response.data)
            //     }
            // }

            let userReq = {
                text: localStorage.getItem("userId")
            }
            const response = await HeaderServices().getInstance().getDetail(userReq);
            if(response){
                setUserInfo(response.data)
            }
        }

        getUserInfo();
    }, [user])

    const openIhcmProfile = () => {
        window.open(APP_CONFIGS.REACT_APP_DOMAIN_IHCM + 'app/#/profile/' + user.id);
    }

    return {userInfo, setUserLogin, user, openIhcmProfile,};
}

export default HeaderAdapter;