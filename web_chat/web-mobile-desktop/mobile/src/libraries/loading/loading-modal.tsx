import React, { PureComponent } from 'react';
import { View, Modal } from 'react-native';
import Spinner from 'react-native-spinkit';
import LoadingManager from './loading-manager';
import PropTypes from 'prop-types';
import colors from 'res/colors';

const TIME_OUT = 5 * 1000;

export function showLoading() {
  const ref = LoadingManager.getDefault();
  if (!!ref) {
    ref.showLoading();
  }
}

export function hideLoading() {
  const ref = LoadingManager.getDefault();
  if (!!ref) {
    ref.hideLoading();
  }
}

interface IProps {
  spinnerSize?: number;
  spinnerType?: string;
  spinnerColor?: string;
}

interface IStates {
  isVisible: boolean;
}

class LoadingModal extends PureComponent<IProps, IStates> {
  static defaultProps = {
    spinnerSize: 40,
    spinnerType: 'Circle',
    spinnerColor: colors.primaryColor,
  };

  static propTypes = {
    spinnerSize: PropTypes.number,
    spinnerType: PropTypes.string,
    spinnerColor: PropTypes.string,
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  componentWillUnmount() {}

  hideLoading = () => {
    const { isVisible } = this.state;
    setTimeout(() => {
      if (isVisible)
        this.setState({
          isVisible: false,
        });
    }, 450);
  };

  showLoading = () => {
    // const { isVisible } = this.state;
    // if (!isVisible)
    //   this.setState({
    //     isVisible: true,
    //   });
  };

  render() {
    const { isVisible } = this.state;
    return (
      <Modal transparent animationType="fade" visible={isVisible}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.25)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner
            isVisible
            size={this.props.spinnerSize}
            type={this.props.spinnerType}
            color={this.props.spinnerColor}
          />
        </View>
      </Modal>
    );
  }
}

export default LoadingModal;
