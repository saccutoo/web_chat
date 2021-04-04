
import { useState } from "react";
import buildFileSelector from "../../../../../../../../libraries/Functions/build-file-selector";
import { IHeaderCreateGroup } from "./header-create-group.props";

function HeaderCreateGroupAdapter(props : IHeaderCreateGroup){
    // State
    const [hasHover , setHasHover] = useState<boolean>(false);

    const { avatarTemp , setAvatarTemp , setAvatar } = props;
    
    function cb (pathFileListTemp: string[]){
        setHasHover(true);
        setAvatarTemp(pathFileListTemp)
    }

    const fileSelector = buildFileSelector(false , true, cb , setAvatar);

    const handleFileSelect = (e: any) => {
        e.preventDefault();
        fileSelector.click();
    }

    return {
        avatarTemp,
        hasHover,
        handleFileSelect
    }
}

export default HeaderCreateGroupAdapter;