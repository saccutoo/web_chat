/* 
    Created by thaolt
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ModalCreateRoomProps } from './modal-create-room.props';
import { ModalCreateRoomAdapter } from './modal-create-room.adapter';
import Modal from 'react-native-modalbox';
import { TextField } from 'libraries/text-field/text-field';
import { DimensionHelpers } from 'helpers/dimension-helpers';

export class ModalCreateRoomComponent extends PureComponent<ModalCreateRoomProps> {
  private ModalCreateRoomAdapter: ModalCreateRoomAdapter;
  refModalBox = React.createRef<Modal>();
  refTextField = React.createRef<TextField>();
  constructor(props: ModalCreateRoomProps) {
    super(props);
    this.ModalCreateRoomAdapter = new ModalCreateRoomAdapter(this);
  }

  render() {
    return (
      <Modal
        ref={this.refModalBox}
        position="center"
        swipeToClose={false}
        backdropPressToClose={true}
        style={{
          height: 'auto',
          width: DimensionHelpers.width - 20,
          borderRadius: 10,
        }}
        onClosed={this.close}
      >
        <>
          <Text style={styles.title}>{translate(new_title)}</Text>

          <TextField
            ref={this.refTextField}
            style={styles.textField}
            defaultValue={df_value}
          />

          <View style={styles.btnView}>
            <Button
              preset={EBtnPreset.ACTIVE}
              labelTx={yesLabel || 'common.yes'}
              onPress={this.actionAgree}
              btnStyles={styles.btn}
            />
            <Button
              preset={EBtnPreset.DEACTIVE}
              labelTx={noLabel || 'common.no'}
              onPress={onNo}
              btnStyles={styles.btn}
            />
          </View>
        </>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
