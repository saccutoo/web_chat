import { URL_PATHS } from "../../helpers/networking/url-paths";
import { deletes, post } from '../../helpers/api/api-helper';
import axios from "axios";

const loginServices = (() => {
    let instance: any;

    function init() {
        return {
            getTokenByPassWord: async (userName: string, password: string) => {
                let data = new URLSearchParams();
                data.append('username', userName)
                data.append('password', password)
                data.append('client_id', 'web')
                data.append('grant_type', 'password')
                
                try {
                    const response = await axios({
                        method: "POST",
                        url: "http://172.16.40.151:8080/auth/realms/localhost/protocol/openid-connect/token",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: data,
                        timeout: 30000,
                    })

                    return response
                } catch (error) {
                    console.log(error)
                }           
            },

            getTokenByRefreshToken: async (refreshToken: string) => {
                let data = new URLSearchParams();
                data.append('refresh_token', refreshToken)
                data.append('client_id', 'web')
                data.append('grant_type', 'refresh_token')
                const response = await post(
                    "http://172.16.40.151:8080/auth/realms/localhost/protocol/openid-connect/token",
                    data,
                    true
                );
                return response
            },
        }
    };

    return {
        getInstance: () => {
            if (!instance) instance = init();
            return instance;
        }
    }
})()

export default loginServices;
