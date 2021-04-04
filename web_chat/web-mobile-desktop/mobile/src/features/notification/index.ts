import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NotificationContainer } from './view/notification.screen';

const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});


export const NotificationScreen = connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);