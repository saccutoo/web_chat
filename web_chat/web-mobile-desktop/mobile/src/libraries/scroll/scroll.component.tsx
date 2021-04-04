import * as React from 'react';
import { StyleSheet, ScrollView, StyleProp, ViewStyle, RefreshControl } from 'react-native';
import { ScrollProps, CloseToBottomProps } from './scroll.props';

export default class ScrollComponent extends React.PureComponent<
  ScrollProps,
  { refreshing: boolean }
> {
  constructor(props: ScrollProps) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  ref = React.createRef<ScrollView>();

  scrollToTop = () => {
    this.ref.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  processRefresh = () => {
    const { onRefresh } = this.props;
    this.setState({
      refreshing: true,
    });
    onRefresh && onRefresh();
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 1000);
  };

  public render() {
    const {
      onEndReached,
      children,
      refreshControl,
      style,
      keyboardShouldPersistTaps,
      onRefresh,
    } = this.props;
    return (
      <ScrollView
        keyboardShouldPersistTaps={keyboardShouldPersistTaps ?? 'handled'}
        style={[styles.fsStyle, style]}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            onEndReached && onEndReached();
          }
        }}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.processRefresh} />
          ) : undefined
        }
        ref={this.ref}
        {...this.props}
      >
        {children}
      </ScrollView>
    );
  }
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  fsStyle: {
    flex: 1,
  },
});

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: CloseToBottomProps) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};
