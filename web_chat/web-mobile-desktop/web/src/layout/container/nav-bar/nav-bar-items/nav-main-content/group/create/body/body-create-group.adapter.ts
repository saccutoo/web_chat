
import { useEffect, useState } from "react";
import { ICompanyMember } from "../../../../nav-company-members/company-member/company-member.props";

function BodyCreateGroupAdapter(props: any){
  // State
  const [hasFooter , setHasFooter] = useState<boolean>(false);
  const [companyMemList , setCompanyMemList] = useState<ICompanyMember[]>([]);


  const selectedUseridList = props.memberIdList;
  const setSelectedUseridList = props.setMemberIdList;

  useEffect(() => {
      if(selectedUseridList.length === 0){
        setHasFooter(false);
      }
  } , [selectedUseridList , setHasFooter])


  const setSelectedUserByCheckbox = (e: any) =>{
    const { name , checked } = e.target;
    const selectedUserid = name;

    handleSelectedUser(checked , selectedUserid)
  }

  const setSelectedUser = (selectedUserid: string) =>{
    const checked = selectedUseridList.some((id: string) => id === selectedUserid);

    handleSelectedUser(!checked , selectedUserid)
  }

  const handleSelectedUser = (checked: boolean , selectedUserid: string) =>{
    if(checked){
      if(selectedUseridList.length === 0){
        setHasFooter(true);
        setSelectedUseridList([...selectedUseridList , selectedUserid]);
      }else{
        if(!selectedUseridList.some((id: string) => id === selectedUserid)){
          setSelectedUseridList([...selectedUseridList , selectedUserid]);
        }
      }
    } else{
      if(selectedUseridList.length === 1){
        setHasFooter(false);
        setSelectedUseridList([]);
      }else{
        if(selectedUseridList.some((id: string) => id === selectedUserid)){
          setSelectedUseridList(selectedUseridList.filter((id: string) => id !== selectedUserid));
        }
      }
    }
  }

  const removeSelectedUser = (selectedUserid:string) =>{
    if(selectedUseridList.length === 1){
      setHasFooter(false);
      setSelectedUseridList([]);
    }else{
      if(selectedUseridList.some((id: string) => id === selectedUserid)){
        setSelectedUseridList(selectedUseridList.filter((id: string) => id !== selectedUserid));
      }
    }
  }


  return {
    hasFooter , 
    setSelectedUser,
    setSelectedUserByCheckbox,
    selectedUseridList,
    removeSelectedUser,
    companyMemList , setCompanyMemList
  }
}

export default BodyCreateGroupAdapter;