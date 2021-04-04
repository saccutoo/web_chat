/* 
    Created by longdq
*/

import {ListMembersContainer} from 'features/list-members/view/list-members.screen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const ListMembersScreen = connect(mapStateToProps, mapDispatchToProps)(ListMembersContainer);
