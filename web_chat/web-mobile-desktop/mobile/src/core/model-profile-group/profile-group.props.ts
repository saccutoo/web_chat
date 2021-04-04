
/* 
    Created by longdq
*/

import { LoginMobileResponse } from "core/common/types/login";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

export interface ProfileGroupProps {
    navigation : NavigationScreenProp<NavigationState, NavigationParams>;
    userInfo: LoginMobileResponse
  
}

