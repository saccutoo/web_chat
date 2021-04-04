/* 
    Created by longdq
*/

// import { showLoading, hideLoading } from 'libraries/loading/loading-modal';
import { processRequestRespository } from 'core/common/networking/api-helper';
import { itemDataCheck } from '../common/types/item-data';
import { User2 } from 'core/common/types/user';
// import {AddMembersContainer} from '../../features/add-members/view/add-members.screen';
import AddMembersServices from './add-members.services';
import { useState } from 'react';
import { AddMembersProps } from './add-members.props';
import { APP_CONFIGS } from 'core/common/app-config';
// import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

function AddMembersAdapter(props: AddMembersProps) {
  // AddMembersContainer: AddMembersContainer;
  // constructor(container: AddMembersContainer) {
  //   this.AddMembersContainer = container;
  // }

  // Variables

  var page: number = APP_CONFIGS.DEFAULT_NUMBER_PAGE;
  const ITEM_PAGE = APP_CONFIGS.ITEM_PER_PAGE;
  // const navigation: NavigationScreenProp<NavigationState, NavigationParams> = props.navigation;

  // States

  const [dataSearchUser, setDataSearchUser] = useState<User2[]>([]);
  const [loading, setLoading] = useState(false);
  const [txt, setTxt] = useState('');
  const [dataUserCheck, setDataUserCheck] = useState<itemDataCheck[]>([]);
  const [emptyNameGr, setEmptyNameGr] = useState(false);
  const [nameGr, setNameGr] = useState('');

  function onRefresh() {
    // this.AddMembersContainer.page = 1;
    // this.AddMembersContainer.setState({
    //   dataSearchUser: [],
    // });
    // this.searchUser();

    page = 1;
    setDataSearchUser([]);
    searchUser();
  }

  function onEndReached() {
    // console.log('test_onEndReached');
    // const { dataSearchUser } = this.AddMembersContainer.state;
    // const { loading } = this.AddMembersContainer.state;
    // let { page, ITEM_PAGE } = this.AddMembersContainer;
    // if (loading || dataSearchUser.length < page * ITEM_PAGE) return;
    // this.AddMembersContainer.page += 1;
    // this.searchUser();
    console.log('test_onEndReached');

    if (loading || dataSearchUser.length < page * ITEM_PAGE) return;
    page += 1;
    searchUser();
    //Call url with new page
  }

  function setTxtSearch(txt: string) {
    // this.AddMembersContainer.setState(
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

  function searchUser() {
    // const text = this.AddMembersContainer.state.txt;
    // const { page, ITEM_PAGE } = this.AddMembersContainer;
    // showLoading();
    // this.AddMembersContainer.setState({
    //   loading: true,
    // });
    setLoading(true);
    processRequestRespository(
      AddMembersServices.getInstance().searchUser({
        value: txt,
        pageParams: { pageSize: ITEM_PAGE, page: page },
      }),
      searchUserSuccess
    );
  }
  function searchUserSuccess(res: User2[]) {
    // this.AddMembersContainer.setState({
    //   loading: false,
    // });
    // // hideLoading();
    // this.AddMembersContainer.setState({
    //   dataSearchUser: [...this.AddMembersContainer.state.dataSearchUser, ...res],
    // });
    setLoading(false);
    setDataSearchUser([...dataSearchUser, ...res]);
  }

  // searchUser = (text: string) => {
  //   showLoading();
  //   processRequestRespository(
  //     CreateGroupServices.getInstance().searchUser(text),
  //     this.searchUserSuccess
  //   );
  // };
  // searchUserSuccess = (res: User[]) => {
  //   hideLoading();
  //   this.CreateGroupContainer.setState({
  //     dataSearchUser: res,
  //   });
  // };

  function setSateDataCheck(data: itemDataCheck[]) {
    // this.AddMembersContainer.setState({
    //   dataUserCheck: data,
    // });
    setDataUserCheck(data);
  }

  function addToDataCheck(item: itemDataCheck) {
    let data = dataUserCheck;
    let isAdd = true;
    if (data && data.length > 0) {
      const id = item && item.item && item.item.id;
      data.map((element: itemDataCheck) => {
        if (element && element.item && element.item.id === id) {
          isAdd = false;
        }
      });
      if (isAdd == true) {
        // this.AddMembersContainer.setState({
        //   dataUserCheck: [item, ...this.AddMembersContainer.state.dataUserCheck],
        // });
        setDataUserCheck([item, ...dataUserCheck]);
      } else {
        return;
      }
    } else {
      // this.AddMembersContainer.setState({
      //   dataUserCheck: [item, ...this.AddMembersContainer.state.dataUserCheck],
      // });
      setDataUserCheck([item, ...dataUserCheck]);
    }
  }

  function removeUserCheck(item: itemDataCheck) {
    // const data = this.AddMembersContainer.state.dataUserCheck;
    const data = dataUserCheck;
    const id = item && item.item && item.item.id;
    let newData = data.filter((e: itemDataCheck) => {
      return e && e.item && e.item.id !== id;
    });
    // this.AddMembersContainer.setState({
    //   dataUserCheck: [...newData],
    // });
    setDataUserCheck([...newData]);
  }

  // function onCreateGr() {
  //   let listIdUser: string[] = [];
  //   // const data = this.AddMembersContainer.state.dataUserCheck;
  //   const data = dataUserCheck;
  //   if (data && data.length > 0) {
  //     data.map((e: itemDataCheck) => {
  //       const id = e && e.item && e.item.id;
  //       listIdUser.push(id);
  //     });
  //     const chatId = navigation.getParam('chatId');
  //     if (!chatId) {
  //       return;
  //     }
  //     const dataPost = {
  //       chatId: chatId,
  //       members: listIdUser,
  //     };
  //     // showLoading();
  //     processRequestRespository(
  //       AddMembersServices.getInstance().addMembers(dataPost),
  //       createGrSuccess
  //     );
  //   }
  // }

  function onChangeText(txt: string) {
    if (txt) {
      // this.AddMembersContainer.setState({
      //   emptyNameGr: false,
      // });
      setEmptyNameGr(false);
    }
    // this.AddMembersContainer.setState({
    //   nameGr: txt,
    // });
    setNameGr(txt);
  }

  function createGrSuccess(res: any) {
    // hideLoading();
    if (res) {
      // NavigationService.popMany(2);
      // EventBus.getInstance().post({
      //   type: EventBusName.RELOAD_LIST_CHAT,
      //   payload: 'RELOAD_LIST_CHAT',
      // });
    }
  }

  return {
    page,
    ITEM_PAGE,
    dataSearchUser,
    loading,
    txt,
    dataUserCheck,
    emptyNameGr,
    nameGr,
    onRefresh,
    onEndReached,
    setTxtSearch,
    searchUserSuccess,
    searchUser,
    setSateDataCheck,
    addToDataCheck,
    removeUserCheck,
    // onCreateGr,
    onChangeText,
    createGrSuccess,
  };
}

export default AddMembersAdapter;
