import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import spacing from 'res/spacings';
import { HeaderTypes } from 'types/header-types';
import { goBack } from './back/back.adapter';
import { BackComponent } from './back/back.component';
import { ContainerProps } from './container.props';
import { HeaderChatDtlComponent } from './header-chat-dtl/header-chat-dtl.component';
import { HeaderTextComponent } from './header-text/header-text.component';

export class ContainerComponent extends PureComponent<ContainerProps> {
  constructor(props: ContainerProps) {
    super(props);

   console.log('====================================');
   console.log('CONTAINER COMPONENTS:',props);
   console.log('====================================');
  }

  renderContent() {
    const { noKeyboardAvoidingView } = this.props;
    if (noKeyboardAvoidingView) return this.props.children;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
      >
        {this.props.children}
      </KeyboardAvoidingView>
    );
  }

  renderHeader() {
    const { onBack, onPressRight, title, headerType, videoCall, chatInfo } = this.props;
    if (headerType) {
      switch (headerType) {
        case HeaderTypes.BACK_TITLE:
          return (
            <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
              <BackComponent
                style={styles.backStyle}
                goBack={onBack || goBack(this.props)}
                title={title || ''}
              />
            </View>
          );
        case HeaderTypes.ICON_RIGHT:
          return (
            <BackComponent
              style={styles.backStyle}
              goBack={onBack || goBack(this.props)}
              title={title || ''}
              iconRight={images.ic_logo}
              onPressRight={onPressRight}
            />
          );
        case HeaderTypes.CHAT_DETAIL:
          return (
            <HeaderChatDtlComponent
              // style={[styles.backStyle, { backgroundColor: colors.white }]}
              goBack={onBack || goBack(this.props)}
              title={title || ''}
              iconRight={images.ic_logo}
              onPressRight={onPressRight}
              chatInfo={chatInfo}
              videoCall={videoCall}
            />
          );
        case HeaderTypes.NONE:
          return <View />;
        default:
          return <View />;
      }
    } else {
      return <HeaderTextComponent title={title || ''} style={styles.backStyle} />;
    }
  }

  render() {
    const { style, isDark } = this.props;
    return (
      <View style={[styles.container, style && { ...style }]}>
        <SafeAreaView style={styles.safeAreaView}>
          {this.renderHeader()}
          {this.renderContent()}
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safeAreaView: {
    flex: 1,
  },
  backStyle: {
    paddingVertical: spacing.medium,
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default ContainerComponent;
