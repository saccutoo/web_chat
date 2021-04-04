import { User } from "../common/types/user";
import { RoomChatProps } from "./room-chat.props";
import { GetRoomChatRes } from "../common/types/base-response";
export declare const RoomChatAdapter: (props: RoomChatProps) => {
    page: number;
    ITEM_PAGE: number;
    dataListUser: User[];
    dataListChat: GetRoomChatRes[];
    onRefresh: () => void;
    onEndReached: () => void;
    registerSubscriber: () => void;
    getListChat: () => void;
    getListUserSuccess: (res: User[]) => void;
};
