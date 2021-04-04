import React, { useEffect, useState } from "react";
import ModalScreen from "../../libraries/Features/modal/modal.screen";

function GetidModalScreen() {
  const [getidModalIsDisplayed , setGetidModalIsDisplayed] = useState<boolean>(true);
  const [userid , setuserid] = useState<string>("");
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setuserid(userId);
    }
  }, [setuserid]);

  const eleContext = (close: any) => {
    return (
      <div className="videocall-container videocall-top">
        <input
          type="text"
          name=""
          id=""
          value={userid}
          onChange={(e: any) => {
            setuserid(e.target.value);
          }}
        />
        <br />
        <button
          onClick={() => {
            getUserid(close);
          }}
          className="videocall-bottom"
        >
          Nhập
        </button>
      </div>
    );
  };

  const getUserid = (close:any) => {
    localStorage.setItem("userId", userid);
    close()
  };

  return (
    <ModalScreen
      headerContent={"Nhập userid của bạn"}
      hasPadding={true}
      contextHasClose={eleContext}
      open={getidModalIsDisplayed}
    >
      <></>
    </ModalScreen>
  );
}

export default GetidModalScreen;
