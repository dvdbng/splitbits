import { bool, func, shape } from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode';

import { connect } from 'react-redux';

import { Modal, Option } from '../components';
import { C, SHAPE, STYLE, THEME } from '../config';
import styles from './ModalTransaction.style';

const { QR_SIZE } = THEME;
const { TYPE: { SEND } } = C;

const ModalTransaction = ({
  device: { address, balance }, i18n, onClose, onPress, visible,
}) => (
  <Modal title={i18n.TYPE_OF_TRANSACTION} visible={visible} onClose={onClose}>
    <View style={[STYLE.COL]}>
      <View style={[STYLE.LIST_ITEM, STYLE.CENTERED, styles.content]}>
        <QRCode value={address} size={QR_SIZE} />
        <Text style={styles.address}>{address}</Text>
      </View>
      <Option
        caption={i18n.SEND_MONEY}
        disabled={balance === '0'}
        hint={(balance === '0') ? i18n.SEND_MONEY_HINT_NO_BALANCE : i18n.SEND_MONEY_HINT}
        icon="arrowForward"
        onPress={() => onPress(SEND)}
      />
    </View>
  </Modal>
);
//  <Option
//    caption={i18n.REQUEST_MONEY}
//    disabled={friends.length === 0}
//    hint={friends.length === 0 ? i18n.REQUEST_MONEY_HINT_NO_FRIENDS : i18n.REQUEST_MONEY_HINT}
//    icon="arrowBack"
//    onPress={() => onPress(REQUEST)}
//  />

ModalTransaction.propTypes = {
  device: shape(SHAPE.DEVICE).isRequired,
  i18n: shape(SHAPE.I18N).isRequired,
  onClose: func,
  onPress: func,
  visible: bool,
};

ModalTransaction.defaultProps = {
  onClose: undefined,
  onPress() {},
  visible: false,
};

const mapStateToProps = ({ device, i18n }) => ({
  device,
  i18n,
});

export default connect(mapStateToProps)(ModalTransaction);
