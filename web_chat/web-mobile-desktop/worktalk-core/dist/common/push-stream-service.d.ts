import { User } from './types/user';
declare const pushStreamService: {
    subAllChats: (userChats: User[]) => void;
    subChannelSystem: () => void;
    subChat: (userID: string) => void;
    closeSocket: () => void;
    closeAllSocket: () => void;
    messageReceived: (text: any) => Promise<void>;
};
export { pushStreamService };
