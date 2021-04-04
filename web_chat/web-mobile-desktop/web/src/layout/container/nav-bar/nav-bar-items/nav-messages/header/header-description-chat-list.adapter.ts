import { useHistory } from 'react-router-dom';

function HeaderDescriptionChatListAdapter() {
  const history = useHistory();

  const redirectToCreateGroup = () =>{
    history.push("/g/create");
  }

  const redirectToCreatePersonalChat = () =>{
    history.push("/p/create");
  }

  return {
    redirectToCreateGroup,
    redirectToCreatePersonalChat
  }
}

export default HeaderDescriptionChatListAdapter;
