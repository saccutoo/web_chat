/* 
    Created by longdq
*/

import { APP_CONFIGS } from 'core/common/app-config';
import { processRequestRespository } from 'core/common/networking/api-helper';
// import { hideLoading, showLoading } from 'libraries/loading/loading-modal';
import { User, User2 } from 'core/common/types/user';
import { useState } from 'react';
// import NewMessageContainer from '../../features/new-message/view/new-message.screen';
import { NewMessageProps } from './new-message.props';
import NewMessageServices from './new-message.services';

function NewMessageAdapter(props: NewMessageProps) {
  // NewMessageContainer: NewMessageContainer;
  // constructor(container: NewMessageContainer) {
  //   this.NewMessageContainer = container;
  // }

  // Variables

  var page: number = APP_CONFIGS.DEFAULT_NUMBER_PAGE;
  const ITEM_PAGE = APP_CONFIGS.CHAT_ITEM_PER_PAGE;

  // States

  const [dataSearchUser, setDataSearchUser] = useState<User2[]>([]);
  const [loading, setLoading] = useState(false);
  const [txt, setTxt] = useState('');

  // logic

  function onRefresh() {
    // this.NewMessageContainer.page = 1;
    // this.NewMessageContainer.setState({
    //   dataSearchUser: [],
    // });
    // this.searchUser();
    (page = 1), setDataSearchUser([]);
  }

  function onEndReached() {
    console.log('test_onEndReached');
    // const { dataSearchUser } = this.NewMessageContainer.state;
    // const { loading } = this.NewMessageContainer.state;
    // let { page, ITEM_PAGE } = this.NewMessageContainer;
    // if (loading || dataSearchUser.length < page * ITEM_PAGE) return;
    // this.NewMessageContainer.page += 1;
    // this.searchUser();
    if (loading || dataSearchUser.length < page * ITEM_PAGE) return;
    page += 1;
    searchUser();
    //Call url with new page
  }

  function searchUser() {
    // const text = this.NewMessageContainer.state.txt;
    const text = txt;
    // const { page, ITEM_PAGE } = this.NewMessageContainer;
    // showLoading();
    // this.NewMessageContainer.setState({
    //   loading: true,
    // });
    setLoading(true);
    processRequestRespository(
      NewMessageServices.getInstance().searchUser({
        value: text,
        pageParams: { pageSize: ITEM_PAGE, page: page },
      }),
      // this.searchUserSuccess
      searchUserSuccess
    );
  }

  function setTxtSearch(txt: string) {
    // this.NewMessageContainer.setState(
    //   {
    //     txt: txt,
    //     dataSearchUser: [],
    //   },
    //   () => {
    //     this.searchUser();
    //   }
    // );
    setTxt(txt);
    setDataSearchUser([]);
    searchUser();
  }

  // searchUser = (text: string) => {
  //   showLoading();
  //   console.log(text, 'text search ......');
  //   processRequestRespository(
  //     NewMessageServices.getInstance().searchUser(text),
  //     this.searchUserSuccess
  //   );
  // };
  function searchUserSuccess(res: User2[]) {
    // this.NewMessageContainer.setState({
    //   loading: false,
    // });
    setLoading(false);
    // hideLoading();
    // this.NewMessageContainer.setState({
    //   dataSearchUser: [...this.NewMessageContainer.state.dataSearchUser, ...res],
    // });
    setDataSearchUser([...dataSearchUser, ...res]);
  }

  return {
    page,
    ITEM_PAGE,
    dataSearchUser,
    loading,
    txt,
    onRefresh,
    searchUserSuccess,
    setTxtSearch,
    onEndReached,
    searchUser,
  };
}

export default NewMessageAdapter;
