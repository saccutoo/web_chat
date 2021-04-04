import * as React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modalbox';
import { SvgXml } from 'react-native-svg';
import svgs from 'res/svgs';

class MenuPopup extends React.PureComponent {
  modalRef = React.createRef<Modal>();

  menuData = [
    { title: 'Tìm kiếm', icon: svgs.ic_search, key: '1' },
    { title: 'Tắt thông báo', icon: svgs.ic_off, key: '1' },
    { title: 'Xóa chat', icon: svgs.ic_delete, key: '1' },
  ];

  // open modal
  open = () => {
    this.modalRef.current?.open();
  };

  // seen all

  onSeenAll = () => {
    this.modalRef.current?.close();
  };

  // delete all

  onDeleteAll = () => {
    this.modalRef.current?.close();
  };

  onPress = (key: string) => {
    switch (key) {
      case '1':
    }
  };

  // render Menupopup
  render() {
    return (
      <Modal
        style={[
          styles.container,
          {
            marginLeft: (Dimensions.get('window').width - styles.container.width) / 2 - 16,
            marginTop: 60,
          },
        ]}
        ref={this.modalRef}
        position={'top'}
        onOpened={() => console.log('open')}
        onClosed={() => console.log('close')}
        backdropOpacity={0}
        animationDuration={0}
      >
        <FlatList
          style={{ flex: 1 }}
          data={this.menuData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={this.onSeenAll}>
              <View style={styles.menu_item_view}>
                <SvgXml width="24" height="24" xml={item.icon} />
                <Text style={styles.item_text}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: 140,
    width: 200,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  menu_item_view: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  item_text: {
    fontSize: 14,
    lineHeight: 21,
    marginLeft: 12,
  },
});

export default MenuPopup;
