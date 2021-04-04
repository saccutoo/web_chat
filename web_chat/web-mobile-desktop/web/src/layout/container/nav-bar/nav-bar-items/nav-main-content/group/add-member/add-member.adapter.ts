import { useEffect, useState } from "react";
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath";
import { ICompanyMember } from "../../../nav-company-members/company-member/company-member.props";
import AddMemberServices from "./add-member.services";

function AddMemberAdapter(props: any){
    const roomId = useIdInPath();
    // State
    const [selectedUserList , setSelectedUserList] = useState<string[]>([]);
    const [hasFooter , setHasFooter] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>('');
    const [companyMemList , setCompanyMemList] = useState<ICompanyMember[]>([]);

    const setSelectedUserByCheckbox = (e: any) =>{
            const { name , checked } = e.target;
            const idSelectedUser = name;
        
            handleSelectedUser(checked , idSelectedUser)
    }
        
    const setSelectedUser = (idSelectedUser: string) =>{
        const checked = selectedUserList.some((id: string) => id === idSelectedUser);
    
        handleSelectedUser(!checked , idSelectedUser)
    }
    
    const handleSelectedUser = (checked: boolean , idSelectedUser: string) =>{
        if(checked){
            if(selectedUserList.length === 0){
                setHasFooter(true);
                setSelectedUserList([...selectedUserList , idSelectedUser]);
            }else{
                if(!selectedUserList.some((id: string) => id === idSelectedUser)){
                setSelectedUserList([...selectedUserList , idSelectedUser]);
                }
            }
        } else{
            if(selectedUserList.length === 1){
                setHasFooter(false);
                setSelectedUserList([]);
            }else{
                if(selectedUserList.some((id: string) => id === idSelectedUser)){
                setSelectedUserList(selectedUserList.filter((id: string) => id !== idSelectedUser));
                }
            }
        }
      }
    
    const removeSelectedUser = (idSelectedUser:string) =>{
        if(selectedUserList.length === 1){
            setHasFooter(false);
            setSelectedUserList([]);
        }else{
            if(selectedUserList.some((id: string) => id === idSelectedUser)){
                setSelectedUserList(selectedUserList.filter((id: string) => id !== idSelectedUser));
            }
        }
    }

    const changeSearch = async (event: any) => {
        setTextSearch(event.target.value);
    };

    const addMember = async () => {
        console.log(selectedUserList)
        console.log(selectedUserList)
        let data = {
            id: roomId,
            chatRoomMemberList: selectedUserList
        }

        const response = await AddMemberServices().getInstance().addMember(data);
        console.log(response);
    }

    return {
        hasFooter,
        setSelectedUserByCheckbox,
        selectedUserList, setSelectedUser,
        removeSelectedUser,
        textSearch, setTextSearch, changeSearch,
        companyMemList , setCompanyMemList,
        addMember
    }
}

export default AddMemberAdapter;