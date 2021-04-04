/* 
    Created by longdq
*/

import { Dispatch } from 'redux';
import SearchContainer from '../view/search.screen';
import { processRequestRespository } from 'core/common/networking/api-helper';
import SearchServices from './search.services';
import { User } from 'core/common/types/user';
import NavigationService from 'routers/navigation-service';
import { ChatDetailScreen } from 'routers/screen-name';
import { TypeParam } from 'core/model-chat-detail/chat-detail.props';
import { showLoading, hideLoading } from 'libraries/loading/loading-modal';
import { hideAlert } from 'libraries/dropdown-alert';

export class SearchAdapter {
  SearchContainer: SearchContainer;
  constructor(container: SearchContainer) {
    this.SearchContainer = container;
  }

  goBack = () => {
    NavigationService.goBack();
  };

  goToChatDetail = (item: User) => {
    NavigationService.navigate(ChatDetailScreen, {
      chatInfo: { data: item, type: TypeParam.FROM_USER },
    });
  };

  // search = (text: string) => {
  //   this.searchUser(text);
  // };

  // searchUser = (text: string) => {
  //   showLoading();
  //   console.log(text, 'text search ......');
  //   processRequestRespository(
  //     SearchServices.getInstance().searchUser(text),
  //     this.searchUserSuccess
  //   );
  // };
  // searchUserSuccess = (res: User[]) => {
  //   hideLoading();
  //   this.SearchContainer.setState({
  //     dataSearchUser: res,
  //   });
  // };

  onRefresh = () => {
    this.SearchContainer.page = 1;
    this.SearchContainer.setState({
      dataSearchUser: [],
    });
    this.searchUser();
  };

  onEndReached = () => {
    console.log('test_onEndReached');
    const { dataSearchUser } = this.SearchContainer.state;
    const { loading } = this.SearchContainer.state;
    let { page, ITEM_PAGE } = this.SearchContainer;
    if (loading || dataSearchUser.length < page * ITEM_PAGE) return;
    this.SearchContainer.page += 1;
    this.searchUser();
    //Call url with new page
  };

  setTxtSearch = (txt: string) => {
    this.SearchContainer.setState(
      {
        txt: txt,
        dataSearchUser: [],
      },
      () => {
        this.searchUser();
      }
    );
  };

  searchUser = () => {
    const text = this.SearchContainer.state.txt;
    const { page, ITEM_PAGE } = this.SearchContainer;
    showLoading();
    this.SearchContainer.setState({
      loading: true,
    });
    processRequestRespository(
      SearchServices.getInstance().searchUser({
        value: text,
        pageParams: { pageSize: ITEM_PAGE, page: page },
      }),
      this.searchUserSuccess
    );
  };
  searchUserSuccess = (res: User[]) => {
    this.SearchContainer.setState({
      loading: false,
    });
    hideLoading();
    this.SearchContainer.setState({
      dataSearchUser: [...this.SearchContainer.state.dataSearchUser, ...res],
    });
  };
}
