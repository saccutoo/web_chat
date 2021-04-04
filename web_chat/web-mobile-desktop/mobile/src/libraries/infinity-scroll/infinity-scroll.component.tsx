import BottomLoadingIndicator from 'libraries/loading/bottom-loading-indicator';
import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RNGestureHandlerButton from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerButton';
import { SvgXml } from 'react-native-svg';
import colors from 'res/colors';
import { translate } from 'res/languages';
import svgs from 'res/svgs';
import { InfinityScrollAdapter } from './infinity-scroll.adapter';
import { InfinityScrollProps } from './infinity-scroll.props';

export const InfinityScrollComponent = (props: InfinityScrollProps) => {
  const { data, onRefresh, onEndReached, isLoading, isFinish } = InfinityScrollAdapter(props);
  const { renderItem } = props;
  var onEndReachedCalledDuringMomentum: boolean = true;

  const renderFooter = () => {
    if (isLoading || isFinish) return null;
    return <BottomLoadingIndicator />;
  };

  return (
    <View style={styles.container}>
      {data.length != 0 ? (
        <FlatList
          data={data}
          // data={listData}
          renderItem={({ item }) => renderItem(item)}
          onRefresh={onRefresh}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum = false;
          }}
          // onEndReached={onEndReached}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum) {
              onEndReached(); // LOAD MORE DATA
              onEndReachedCalledDuringMomentum = true;
            }
          }}
          onEndReachedThreshold={0.7}
          refreshing={isLoading}
          ListFooterComponent={renderFooter}
          numColumns={props.numberColumn || 1}
        />
      ) : (
        <View style={styles.emptyView}>
          <SvgXml height={200} width={200} xml={svgs.ic_search_empty} />
          <Text style={styles.txtEmpty}>{translate('search.empty')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyView: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMessage: {},
  txtEmpty: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.txtColor,
    marginTop: 12,
  },
});
