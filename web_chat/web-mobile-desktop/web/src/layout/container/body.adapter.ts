import { useState } from "react";
import { ENUM_KIND_OF_ICONPANEL } from "../../libraries/Enum/icon-panel";
import useWindowSize from "../../libraries/Hooks/useWindowSize";

function BodyAdapter(){
  // State
  const [activedIcon , setActivedIcon] = useState(ENUM_KIND_OF_ICONPANEL.MESSAGES);
  
  const { width ,  height } = useWindowSize();

  const eleHeader: any = document.querySelector('.header-container');
  const heightHeader = eleHeader ? eleHeader.offsetHeight : 50;

  const styleInlineBody = {
    height: height- heightHeader
  }

  const styleInlineBodyRight={
    height : width < 768 ? height - 100 : ""
  }

  return {
      activedIcon , setActivedIcon,
      styleInlineBody,
      styleInlineBodyRight
  }
}

export default BodyAdapter;