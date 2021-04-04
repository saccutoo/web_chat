
/* 
    Created by huydz
*/

import { ISearchChatRoom } from "../../../layout/container/nav-bar/nav-bar-items/nav-messages/description-chat/description-chat.props";


// import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

// export interface SearchFieldProps {
//   navigation: NavigationScreenProp<NavigationState, NavigationParams>
// }

export interface SearchFieldProps {
  searchDescriptionChatList: ISearchChatRoom[];
  customClass?: string;
  isBoxChat?: boolean;
}
