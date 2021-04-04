import { AuthenResponse } from 'features/authen/model';
import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { saveUserInfo } from 'core/common/redux/actions';
import { SplashPresenter } from './splash.presenter';
import { SplashView } from './splash.view';

interface Props {
  saveUser: (data: AuthenResponse) => void;
}

class SplashScreen extends React.PureComponent<Props> implements SplashView {
  private presenter: SplashPresenter;
  constructor(props: Props) {
    super(props);
    this.presenter = new SplashPresenter(this);
  }

  public componentDidMount(): void {
    this.presenter.onNavigate();
  }

  public onSaveAuthenRes = (loginSession: AuthenResponse): void => {
    this.props.saveUser?.(loginSession);
  };

  public render(): React.ReactNode {
    return <View />;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveUser: (data: AuthenResponse) => {
    dispatch(saveUserInfo(data));
  },
});

export default connect(null, mapDispatchToProps)(SplashScreen);
