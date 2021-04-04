/* 
    Created by longdq
*/

import { TypeParam } from 'core/model-chat-detail/chat-detail.props';
import { processRequestRespository } from 'core/common/networking/api-helper';
import { hideLoading, showLoading } from 'libraries/loading/loading-modal';
import NavigationService from 'routers/navigation-service';
import {
  ChatDetailScreen,
  NewMessageScreen,
  ProfileScreen,
  SearchScreen,
} from 'routers/screen-name';
import { User, User2 } from 'core/common/types/user';
// import ListMembersContainer from '../../features/list-members/view/list-members.screen';
import ListMembersServices from './list-members.services';
// import { User, User2 } from 'types/user';
// import ListMembersContainer from 'features/list-members/view/list-members.screen';
import { ListMembersProps } from './list-members.props';
import { useEffect, useState } from 'react';
import { APP_CONFIGS } from 'core/common/app-config';

function ListMembersAdapter(props: ListMembersProps) {
  // ListMembersContainer: ListMembersContainer;
  // constructor(container: ListMembersContainer) {
  //   this.ListMembersContainer = container;
  // }

  // Variables
  var page: number = APP_CONFIGS.DEFAULT_NUMBER_PAGE;
  const ITEM_PAGE = APP_CONFIGS.CHAT_ITEM_PER_PAGE;

  // States
  // const [page,setPage] = useState(1)
  const [dataSearchUser, setDataSearchUser] = useState<User2[]>([]);
  const [loading, setLoading] = useState(false);
  const [txt, setTxt] = useState('');

  // logic

  // function goToProfile() {
  //   NavigationService.navigate(ProfileScreen, {
  //     user: userInfo.user,
  //   });
  // }

  // function goToSearch() {
  //   NavigationService.navigate(SearchScreen);
  // }

  // function goToNewMess() {
  //   NavigationService.navigate(NewMessageScreen);
  // }

  useEffect(() => {
    console.log(
      'ListMembersAdapter-List member update state :',
      page,
      '--------dataUSer: ',
      dataSearchUser
    );
  });

  function onRefresh() {
    page = 1;
    // setPage(1)
    setDataSearchUser([]);
    searchUser();

    console.log('ListMembersAdapter-List Member refresh :', page, '-------------', dataSearchUser);
  }

  function onEndReached() {
    // console.log('test_onEndReached');
    // const { dataSearchUser } = this.ListMembersContainer.state;
    // const { loading } = this.ListMembersContainer.state;
    // let { page, ITEM_PAGE } = this.ListMembersContainer;
    if (loading || dataSearchUser.length < page * ITEM_PAGE) return;
    // page += 1

    // setPage(page+1)
    page += 1;
    console.log('ListMembersAdapter - ON END LIST MEMBER :', page, '-----', dataSearchUser);
    searchUser();

    //Call url with new pages
  }

  function setTxtSearch(txt: string) {
    // this.ListMembersContainer.setState(
    //   {
    //     txt: txt,
    //     dataSearchUser: [],
    //   },
    //   () => {
    //     this.searchUser();
    //   }
    // );
    console.log('ListMembersAdapter---------Set text search :', txt);

    setTxt(txt);
    setDataSearchUser([]);
    console.log('Search TXT : ', txt, '--------', dataSearchUser);

    // searchUser();
    searchUserByText();
  }

  function searchUser() {
    // const text = this.ListMembersContainer.state.txt;
    // const text = txt;
    // const { page, ITEM_PAGE } = this.ListMembersContainer;
    // showLoading();
    // this.ListMembersContainer.setState({
    //   loading: true,
    // });
    console.log('ListMembersAdapter--------- SEARCH USER :');

    setLoading(true);
    processRequestRespository(
      ListMembersServices.getInstance().searchUser({
        value: txt,
        pageParams: { pageSize: ITEM_PAGE, page: page },
      }),
      searchUserSuccess
    );
  }

  // search user by text

  function searchUserByText() {
    // const text = this.ListMembersContainer.state.txt;
    // const text = txt;
    // const { page, ITEM_PAGE } = this.ListMembersContainer;
    // showLoading();
    // this.ListMembersContainer.setState({
    //   loading: true,
    // });
    setDataSearchUser([]);
    console.log('ListMembersAdapter--------- SEARCH USER BY TEXT : ', txt);

    setLoading(true);
    processRequestRespository(
      ListMembersServices.getInstance().searchUserByText({
        value: txt,
        pageParams: { pageSize: ITEM_PAGE, page: page },
      }),
      searchUserSuccess
    );
  }

  const searchUserSuccess = (res: User2[]) => {
    // this.ListMembersContainer.setState({
    //   loading: false,
    // });
    console.log('ListMembersAdapter----------- SEARCH USER SUCCESS:', res);

    setLoading(false);
    // hideLoading();
    // this.ListMembersContainer.setState({
    //   dataSearchUser: [...this.ListMembersContainer.state.dataSearchUser, ...res],
    // });
    setDataSearchUser([...dataSearchUser, ...res]);
  };

  // function goToChatDetail(item: User2) {
  //   NavigationService.navigate(ChatDetailScreen, {
  //     chatInfo: { data: item, type: TypeParam.FROM_USER },
  //   });
  // }

  return {
    page,
    ITEM_PAGE,
    dataSearchUser,
    loading,
    txt,
    // goToProfile,
    // goToSearch,
    // goToNewMess,
    onRefresh,
    onEndReached,
    setTxtSearch,
    searchUser,
    searchUserSuccess,
    // goToChatDetail,
  };
}

export default ListMembersAdapter;
