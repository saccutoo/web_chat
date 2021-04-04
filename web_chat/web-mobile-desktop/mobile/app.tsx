import RootComponent from 'features/root';
import DropdownManager from 'libraries/dropdown-alert/dropdown-manager';
import LoadingManager from 'libraries/loading/loading-manager';
import LoadingModal from 'libraries/loading/loading-modal';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import store from 'core/common/redux/store';
import colors from 'res/colors';
import MainNavigation from 'routers/main-navigation';
import NavigationService from 'routers/navigation-service';

interface Props {}

export default class App extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }
  loadingRef: any = null;
  dropDownAlertRef: any = null;

  componentDidMount() {
    this.loadingRef && LoadingManager.register(this.loadingRef);
    this.dropDownAlertRef && DropdownManager.register(this.dropDownAlertRef);
  }

  componentWillUnmount() {
    LoadingManager && LoadingManager.unregister(this.loadingRef);
    DropdownManager && DropdownManager.unregister(this.dropDownAlertRef);
  }

  public render() {
    return (
      <Provider store={store}>
        <RootComponent>
          <MainNavigation
            ref={(navigatorRef) => NavigationService.setTopLevelNavigator(navigatorRef)}
          />
          <DropdownAlert
            useNativeDriver
            translucent
            inactiveStatusBarBackgroundColor={colors.white}
            titleNumOfLines={4}
            titleStyle={styles.dropStyle}
            showCancel={false}
            elevation={3}
            updateStatusBar={false}
            ref={(ref) => {
              this.dropDownAlertRef = ref;
            }}
          />
          <LoadingModal
            ref={(ref) => {
              this.loadingRef = ref;
            }}
          />
          <FlashMessage position="top" />
        </RootComponent>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  dropStyle: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
  },
});
