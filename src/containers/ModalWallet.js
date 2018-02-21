import { bool, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

import { Modal, Option } from '../components';
import { SHAPE, STYLE, THEME } from '../config';
import { removeWalletAction, updateTransactionsAction } from '../store/actions';
import styles from './ModalWallet.style';

const { QR_SIZE } = THEME;

class ModalWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
    };
  }

  componentWillReceiveProps() {
    this.setState({ pro: false });
  }

  render() {
    const {
      props: {
        i18n, onBackup, onClose, visible, wallet,
      },
      state: { pro },
    } = this;
    const {
      address, imported, readOnly,
    } = wallet;
    const created = !imported && !readOnly;

    return (
      <View>
        <Modal title={i18n.WALLET} visible={visible && !pro} onClose={onClose}>
          <View style={[STYLE.LIST_ITEM, STYLE.CENTERED, styles.content]}>
            <QRCode value={address} size={QR_SIZE} />
            <Text style={styles.address}>{address}</Text>
          </View>
          <View style={[STYLE.COL]}>
            { created &&
              <Option
                caption={i18n.CREATE_BACKUP}
                hint={i18n.CAPTION.CREATE_BACKUP}
                icon="backup"
                onPress={onBackup}
              /> }
          </View>
        </Modal>
      </View>
    );
  }
}

ModalWallet.propTypes = {
  i18n: shape(SHAPE.I18N).isRequired,
  onBackup: func,
  onClose: func,
  visible: bool,
  wallet: shape(SHAPE.WALLET).isRequired,
};

ModalWallet.defaultProps = {
  onBackup() {},
  onClose() {},
  visible: false,
};

const mapStateToProps = ({ currencies, i18n, device }) => ({
  currencies,
  i18n,
  device,
});

const mapDispatchToProps = dispatch => ({
  removeWallet: wallet => dispatch(removeWalletAction(wallet)),
  updateTransactions: transaction => dispatch(updateTransactionsAction([transaction])),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWallet);
