import { GetRoomChatReq } from '../common/types/base-request';
export default class RoomChatServices {
    private static instance;
    static getInstance(): RoomChatServices;
    getListUser: () => Promise<any>;
    getRoomChat: (params: GetRoomChatReq) => Promise<any>;
}
