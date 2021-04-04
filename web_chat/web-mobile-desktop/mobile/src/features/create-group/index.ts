
/* 
    Created by longdq
*/

import {CreateGroupContainer} from 'features/create-group/view/create-group.screen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: any) => ({
    userInfo: state.userInfo,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
   
});

export const CreateGroupScreen = connect(mapStateToProps, mapDispatchToProps)(CreateGroupContainer)


