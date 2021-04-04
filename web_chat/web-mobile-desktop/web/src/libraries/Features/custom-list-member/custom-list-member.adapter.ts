import { useEffect, useRef, useState } from 'react';
import { ENUM_KIND_OF_STATUS_CODE } from '../../Enum/status-code';
import useIdInPath from '../../Hooks/useIdInPath';
import CustomListMemberServices from './custom-list-member.services';

function CustomListMemberAdapter() {
    const [listMember, setListMember] = useState<any[]>();
    const roomId = useIdInPath(2);
    const userId: string = localStorage.getItem('userId') || "";
    useEffect(() => {
        const GetData = async () => {
            if (roomId !== "") {
                //hungdm - thêm params userId để lọc
                const response = await CustomListMemberServices().getInstance().getListMemberInConversation(roomId,userId);
                if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    const result = response.data;
                    setListMember(result);
                }
            }
        }
        GetData();
    }, [roomId]);
    return {
        listMember
    }
}
export default CustomListMemberAdapter;
