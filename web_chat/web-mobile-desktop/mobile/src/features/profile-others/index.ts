/* 
    Created by longdq
*/

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ProfileOthersContainer } from './view/profile-others.screen';

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const ProfileOthersScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileOthersContainer);
