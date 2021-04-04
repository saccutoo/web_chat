/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { ModalDeleteProps } from './modal-delete.props';
import { ModalDeleteAdapter } from './modal-delete.adapter';
import Modal from 'react-native-modalbox';
import { DimensionHelpers } from 'helpers/dimension-helpers';
import { GetUserConversationRes } from 'core/common/types/base-response';

export class ModalDeleteComponent extends PureComponent<
  ModalDeleteProps,
  { modalVisible: boolean; item: GetUserConversationRes }
> {
  private ModalDeleteAdapter: ModalDeleteAdapter;
  constructor(props: ModalDeleteProps) {
    super(props);
    this.ModalDeleteAdapter = new ModalDeleteAdapter(this);
    this.state = {
      modalVisible: false,
      item: null,
    };
  }

  showModal = (item: GetUserConversationRes) => {
    console.log('Modal show');

    this.setState({
      modalVisible: true,
      item: item,
    });
  };

  hideModal = () => {
    console.log('Modal hide');
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    return (
      <Modal
        // visible={this.state.modalVisible}
        isOpen={this.state.modalVisible}
        backdropPressToClose={true}
        // coverScreen={true}
        style={{
          height: 'auto',
          width: DimensionHelpers.width - 20,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingVertical: 30,
          paddingHorizontal: 30,
        }}
        // position = {}
        // animationType="slide"
        // transparent={true}
        // onRequestClose={() => {
        //   console.log('close');
        // }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Xác nhận</Text>
          <Text style={styles.text}>Bạn có chắc chắn tiếp tục thực hiện thao tác này?</Text>
          <View style={styles.button_ctn}>
            <TouchableOpacity
              style={[styles.btn, { borderColor: '#B3B8C2', borderWidth: 1 }]}
              onPress={() => this.hideModal()}
            >
              <Text style={{ color: '#99A0AD' }}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#115DD3' }]}
              onPress={() => this.props.confirm(this.state.item)}
            >
              <Text style={{ color: '#fff' }}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#4D5971',
    textAlign: 'center',
    marginBottom: 32,
  },
  button_ctn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 50,
  },
  btn: {
    height: 40,
    width: 120,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
