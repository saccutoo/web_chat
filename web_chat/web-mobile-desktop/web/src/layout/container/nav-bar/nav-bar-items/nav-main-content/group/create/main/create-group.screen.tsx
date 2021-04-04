import React from 'react';
import HeaderCreateGroupScreen from '../header/header-create-group.screen';
import BodyCreateGroupScreen from '../body/body-create-group.screen';
import './create-group.scss';
import CreateGroupAdapter from './create-group.adapter';


function CreateGroupScreen() {

  const {
    createChatRoom,
    title , setTitle,
    setAvatar,
    avatarTemp , setAvatarTemp,
    memberIdList , setMemberIdList,
    slogan , setSlogan,
    changeSearch, textSearch
  } = CreateGroupAdapter()

  return (
    <>
        <HeaderCreateGroupScreen
          title={ title }
          setTitle={ setTitle }
          slogan={ slogan }
          setSlogan={ setSlogan }
          setAvatar={ setAvatar }
          avatarTemp={ avatarTemp }
          setAvatarTemp={ setAvatarTemp }
        ></HeaderCreateGroupScreen>

        <BodyCreateGroupScreen 
          createChatRoom={ createChatRoom }
          memberIdList={ memberIdList }
          setMemberIdList={ setMemberIdList }
          changeSearch = {changeSearch}
          textSearch = {textSearch}
        ></BodyCreateGroupScreen>
    </>
  );
}

export default CreateGroupScreen;
